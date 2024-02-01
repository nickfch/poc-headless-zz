'use strict';

/**
 * mood-tracking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mood-tracking.mood-tracking');
