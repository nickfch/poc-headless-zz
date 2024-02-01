'use strict';

/**
 * mood-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mood-status.mood-status');
