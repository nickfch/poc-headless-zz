'use strict';

/**
 * patient-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::patient-tag.patient-tag');
