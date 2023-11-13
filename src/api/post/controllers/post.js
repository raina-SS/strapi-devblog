'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
        await strapi.service("api::post.post").exampleService();
        try {
            ctx.body = 'ok';
        } catch (err) {
            ctx.body = err;
        }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    // async find(ctx) {
    //     // fetch all posts
    //     const { data, meta } = await super.find(ctx);

    //     if (ctx.state.user)
    //         return { data, meta };

    //     const filteredData = data.filter((post) => !post.attributes.premium)
    //     return { data: filteredData, meta }
    // },

    // async find(ctx) {
    //     const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium["$eq"] == "false";
    //     // if authenticated
    //     if (ctx.state.user || isRequestingNonPremium)
    //         return await super.find(ctx);

    //     // not authenticated
    //     const {query} = ctx
    //     const filteredPosts = await strapi.service("api::post.post").find({
    //         ...query,
    //         filters: {
    //             ...query.filters,
    //             premium: false
    //         }
    //     })

    //     const sanitizedPosts = await this.sanitizeOutput(filteredPosts, ctx)
    //     return this.transformResponse(sanitizedPosts)
    // },

    async find(ctx) {
        const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium["$eq"] == "false";
        // if authenticated
        if (ctx.state.user || isRequestingNonPremium)
            return await super.find(ctx);

        // not authenticated
        const publicPosts = await strapi.service("api::post.post").findPublic(ctx.query)

        const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx)
        return this.transformResponse(sanitizedPosts)
    },

    // Method 3: Replacing a core action with proper sanitization
    // async findOne(ctx) {
    //     console.log('findOne')

    //     const { id } = ctx.params
    //     const { query } = ctx

    //     const entity = await strapi.service('api::post.post').findOne(id, query)
    //     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    //     return this.transformResponse(sanitizedEntity);


    //     // // validateQuery (optional)
    //     // // to throw an error on query params that are invalid or the user does not have access to
    //     // await this.validateQuery(ctx);

    //     // // sanitizeQuery to remove any query params that are invalid or the user does not have access to
    //     // // It is strongly recommended to use sanitizeQuery even if validateQuery is used
    //     // const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    //     // console.log('sanitizedQueryParams', sanitizedQueryParams)
    //     // const { results, pagination } = await strapi.service('api::post.post').find(sanitizedQueryParams);
    //     // const sanitizedResults = await this.sanitizeOutput(results, ctx);

    //     // return this.transformResponse(sanitizedResults, { pagination });
    // }

    async findOne(ctx) {
        if (ctx.state.user)
            return await super.findOne(ctx);

        const { id } = ctx.params
        const { query } = ctx

        const postIfPublic = await strapi.service("api::post.post").findOneIfPublic({
            id, query
        })

        // const entity = await strapi.service('api::post.post').findOne(id, query)
        const sanitizedEntity = await this.sanitizeOutput(postIfPublic, ctx);

        return this.transformResponse(sanitizedEntity);

    },

    async likePost(ctx) {
        const user = ctx.state.user
        const postId = ctx.params.id
        const {query} = ctx

        const updatedPost = await strapi.service("api::post.post").likePost({
            postId, userId: user.id, query
        })

        const sanitizedEntity = await this.sanitizeOutput(updatedPost, ctx);

        return this.transformResponse(sanitizedEntity);    }
}));
