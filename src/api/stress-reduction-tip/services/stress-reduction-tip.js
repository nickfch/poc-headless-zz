'use strict';

/**
 * stress-reduction-tip service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stress-reduction-tip.stress-reduction-tip');
