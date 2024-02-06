'use strict';

/**
 * user-reaction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-reaction.user-reaction');
