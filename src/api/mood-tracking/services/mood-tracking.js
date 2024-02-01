'use strict';

/**
 * mood-tracking service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mood-tracking.mood-tracking');
