'use strict';

/**
 * static-pge service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::static-pge.static-pge');
