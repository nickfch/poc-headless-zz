'use strict';

/**
 * episode-trigger service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::episode-trigger.episode-trigger');
