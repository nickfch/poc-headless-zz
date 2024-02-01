'use strict';

/**
 * on-boarding service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::on-boarding.on-boarding');
