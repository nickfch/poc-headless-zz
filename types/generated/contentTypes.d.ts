import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    user_reactions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::user-reaction.user-reaction'
    >;
    tags: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::tag.tag'
    >;
    mood_trackings: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::mood-tracking.mood-tracking'
    >;
    episodes: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::episode.episode'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnimationAnimation extends Schema.CollectionType {
  collectionName: 'animations';
  info: {
    singularName: 'animation';
    pluralName: 'animations';
    displayName: 'Animation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    target_type: Attribute.Enumeration<['ios', 'android', 'mobile', 'web']> &
      Attribute.Required &
      Attribute.DefaultTo<'mobile'>;
    data: Attribute.JSON & Attribute.Required;
    tags: Attribute.Relation<
      'api::animation.animation',
      'manyToMany',
      'api::tag.tag'
    >;
    falback_image: Attribute.Media & Attribute.Required;
    relaxation_technique: Attribute.Relation<
      'api::animation.animation',
      'manyToOne',
      'api::relaxation-technique.relaxation-technique'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::animation.animation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::animation.animation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    short_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cover: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: Attribute.Relation<
      'api::article.article',
      'oneToMany',
      'api::tag.tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::article.article',
      'oneToMany',
      'api::article.article'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBreathingExerciseBreathingExercise
  extends Schema.CollectionType {
  collectionName: 'breathing_exercises';
  info: {
    singularName: 'breathing-exercise';
    pluralName: 'breathing-exercises';
    displayName: 'Breathing Exercise';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    benefits: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    instruction: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToOne',
      'api::instruction.instruction'
    >;
    visual_guide: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToOne',
      'api::educate-video.educate-video'
    >;
    music: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToOne',
      'api::relaxation-sound.relaxation-sound'
    >;
    tags: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToMany',
      'api::tag.tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::breathing-exercise.breathing-exercise',
      'oneToMany',
      'api::breathing-exercise.breathing-exercise'
    >;
    locale: Attribute.String;
  };
}

export interface ApiEducateVideoEducateVideo extends Schema.CollectionType {
  collectionName: 'educate_videos';
  info: {
    singularName: 'educate-video';
    pluralName: 'educate-videos';
    displayName: 'Educate Video';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text & Attribute.Required;
    duration: Attribute.Float;
    topic: Attribute.String & Attribute.Required;
    lang: Attribute.Enumeration<['en']> &
      Attribute.Required &
      Attribute.DefaultTo<'en'>;
    source: Attribute.Media;
    thumbnail: Attribute.Media;
    timelines: Attribute.Relation<
      'api::educate-video.educate-video',
      'oneToMany',
      'api::timeline.timeline'
    >;
    breathing_exercise: Attribute.Relation<
      'api::educate-video.educate-video',
      'oneToOne',
      'api::breathing-exercise.breathing-exercise'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::educate-video.educate-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::educate-video.educate-video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEpisodeEpisode extends Schema.CollectionType {
  collectionName: 'episodes';
  info: {
    singularName: 'episode';
    pluralName: 'episodes';
    displayName: 'Episode';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    time_duration: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 24;
        },
        number
      >;
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      >;
    notes: Attribute.Text;
    tags: Attribute.Relation<
      'api::episode.episode',
      'oneToMany',
      'api::tag.tag'
    >;
    user: Attribute.Relation<
      'api::episode.episode',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    trigger: Attribute.Enumeration<
      [
        'WORK_PRESSURE',
        'FAMILY_ISSUES',
        'FINANCIAL_STRAIN',
        'HEALTH_CONCERNS',
        'RELATIONSHIP_TROUBLE',
        'UNCERTAINTY',
        'SOCIAL_ISOLATION',
        'PERSONAL_FAILURE',
        'OVERWHELMING_RESPONSIBILITIES',
        'LACK_OF_SLEEP',
        'OTHER'
      ]
    > &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::episode.episode',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::episode.episode',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEpisodeTriggerEpisodeTrigger extends Schema.CollectionType {
  collectionName: 'episode_triggers';
  info: {
    singularName: 'episode-trigger';
    pluralName: 'episode-triggers';
    displayName: 'Episode Trigger';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    value: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::episode-trigger.episode-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::episode-trigger.episode-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::episode-trigger.episode-trigger',
      'oneToMany',
      'api::episode-trigger.episode-trigger'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFeatureFlagFeatureFlag extends Schema.CollectionType {
  collectionName: 'feature_flags';
  info: {
    singularName: 'feature-flag';
    pluralName: 'feature-flags';
    displayName: 'Feature Flag';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    feature_name: Attribute.String & Attribute.Required & Attribute.Unique;
    enabled: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    env: Attribute.Enumeration<['PROD', 'STAG', 'DEV']> &
      Attribute.Required &
      Attribute.DefaultTo<'DEV'>;
    status: Attribute.Enumeration<['DEPRECATED', 'ACTIVE']> &
      Attribute.DefaultTo<'ACTIVE'>;
    deprecated_at: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feature-flag.feature-flag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::feature-flag.feature-flag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInstructionInstruction extends Schema.CollectionType {
  collectionName: 'instructions';
  info: {
    singularName: 'instruction';
    pluralName: 'instructions';
    displayName: 'Instruction';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    introduction: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    conclusion: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    steps: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tips: Attribute.Relation<
      'api::instruction.instruction',
      'oneToMany',
      'api::tip.tip'
    >;
    images: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: Attribute.Relation<
      'api::instruction.instruction',
      'oneToMany',
      'api::tag.tag'
    >;
    rating: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<10>;
    relaxation_technique: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'api::relaxation-technique.relaxation-technique'
    >;
    breathing_exercise: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'api::breathing-exercise.breathing-exercise'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::instruction.instruction',
      'oneToMany',
      'api::instruction.instruction'
    >;
    locale: Attribute.String;
  };
}

export interface ApiMoodStatusMoodStatus extends Schema.CollectionType {
  collectionName: 'mood_statuses';
  info: {
    singularName: 'mood-status';
    pluralName: 'mood-statuses';
    displayName: 'Mood Status';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      >;
    emotion_type: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    emotion_value: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    internal_description: Attribute.Text &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    mood_tracking: Attribute.Relation<
      'api::mood-status.mood-status',
      'oneToOne',
      'api::mood-tracking.mood-tracking'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mood-status.mood-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mood-status.mood-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::mood-status.mood-status',
      'oneToMany',
      'api::mood-status.mood-status'
    >;
    locale: Attribute.String;
  };
}

export interface ApiMoodTrackingMoodTracking extends Schema.CollectionType {
  collectionName: 'mood_trackings';
  info: {
    singularName: 'mood-tracking';
    pluralName: 'mood-trackings';
    displayName: 'Mood Tracking';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    mood: Attribute.Relation<
      'api::mood-tracking.mood-tracking',
      'oneToOne',
      'api::mood-status.mood-status'
    >;
    sleep_duration: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 24;
        },
        number
      >;
    notes: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mood-tracking.mood-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mood-tracking.mood-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOnBoardingOnBoarding extends Schema.CollectionType {
  collectionName: 'on_boardings';
  info: {
    singularName: 'on-boarding';
    pluralName: 'on-boardings';
    displayName: 'On boarding';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    media_conent: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    order: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 10;
        },
        number
      >;
    internal_description: Attribute.Text &
      Attribute.Private &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::on-boarding.on-boarding',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::on-boarding.on-boarding',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::on-boarding.on-boarding',
      'oneToMany',
      'api::on-boarding.on-boarding'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPanicAttackSymptomPanicAttackSymptom
  extends Schema.CollectionType {
  collectionName: 'panic_attack_symptoms';
  info: {
    singularName: 'panic-attack-symptom';
    pluralName: 'panic-attack-symptoms';
    displayName: 'Panic Attack Symptom';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    value: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    label: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::panic-attack-symptom.panic-attack-symptom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::panic-attack-symptom.panic-attack-symptom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::panic-attack-symptom.panic-attack-symptom',
      'oneToMany',
      'api::panic-attack-symptom.panic-attack-symptom'
    >;
    locale: Attribute.String;
  };
}

export interface ApiRelaxationSoundRelaxationSound
  extends Schema.CollectionType {
  collectionName: 'relaxation_sounds';
  info: {
    singularName: 'relaxation-sound';
    pluralName: 'relaxation-sounds';
    displayName: 'Relaxation Sound';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text & Attribute.Required & Attribute.Unique;
    audio: Attribute.Media & Attribute.Required;
    duration: Attribute.Float & Attribute.Required;
    timelines: Attribute.Relation<
      'api::relaxation-sound.relaxation-sound',
      'oneToMany',
      'api::timeline.timeline'
    >;
    relaxation_techniques: Attribute.Relation<
      'api::relaxation-sound.relaxation-sound',
      'oneToMany',
      'api::relaxation-technique.relaxation-technique'
    >;
    breathing_exercise: Attribute.Relation<
      'api::relaxation-sound.relaxation-sound',
      'oneToOne',
      'api::breathing-exercise.breathing-exercise'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relaxation-sound.relaxation-sound',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::relaxation-sound.relaxation-sound',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRelaxationTechniqueRelaxationTechnique
  extends Schema.CollectionType {
  collectionName: 'relaxation_techniques';
  info: {
    singularName: 'relaxation-technique';
    pluralName: 'relaxation-techniques';
    displayName: 'Relaxation Technique';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    relaxation_sound: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'manyToOne',
      'api::relaxation-sound.relaxation-sound'
    >;
    instruction: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToOne',
      'api::instruction.instruction'
    >;
    cover: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    animations: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToMany',
      'api::animation.animation'
    >;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToMany',
      'api::tag.tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::relaxation-technique.relaxation-technique',
      'oneToMany',
      'api::relaxation-technique.relaxation-technique'
    >;
    locale: Attribute.String;
  };
}

export interface ApiStressReductionTipStressReductionTip
  extends Schema.CollectionType {
  collectionName: 'stress_reduction_tips';
  info: {
    singularName: 'stress-reduction-tip';
    pluralName: 'stress-reduction-tips';
    displayName: 'Stress Reduction Tip';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cetegory: Attribute.Enumeration<['healthcare']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    steps: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    aditional_information: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: Attribute.Relation<
      'api::stress-reduction-tip.stress-reduction-tip',
      'oneToMany',
      'api::tag.tag'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stress-reduction-tip.stress-reduction-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stress-reduction-tip.stress-reduction-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::stress-reduction-tip.stress-reduction-tip',
      'oneToMany',
      'api::stress-reduction-tip.stress-reduction-tip'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    value: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    internal_description: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    type: Attribute.Enumeration<['Medicale']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    label: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    animations: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::animation.animation'
    >;
    stress_reduction_tip: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::stress-reduction-tip.stress-reduction-tip'
    >;
    tip: Attribute.Relation<'api::tag.tag', 'manyToOne', 'api::tip.tip'>;
    timeline: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::timeline.timeline'
    >;
    article: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::article.article'
    >;
    instruction: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::instruction.instruction'
    >;
    relaxation_technique: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::relaxation-technique.relaxation-technique'
    >;
    breathing_exercise: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::breathing-exercise.breathing-exercise'
    >;
    episode: Attribute.Relation<
      'api::tag.tag',
      'manyToOne',
      'api::episode.episode'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tag.tag',
      'oneToMany',
      'api::tag.tag'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTermsAndConditionTermsAndCondition
  extends Schema.SingleType {
  collectionName: 'terms_and_conditions';
  info: {
    singularName: 'terms-and-condition';
    pluralName: 'terms-and-conditions';
    displayName: 'Terms and Condition';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    version: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.DefaultTo<'v1'>;
    content: Attribute.RichText & Attribute.Required;
    effective_date: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::terms-and-condition.terms-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTimelineTimeline extends Schema.CollectionType {
  collectionName: 'timelines';
  info: {
    singularName: 'timeline';
    pluralName: 'timelines';
    displayName: 'Timeline Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text & Attribute.Required;
    start: Attribute.Float & Attribute.Required;
    end: Attribute.Float & Attribute.Required;
    tags: Attribute.Relation<
      'api::timeline.timeline',
      'oneToMany',
      'api::tag.tag'
    >;
    relaxation_sound: Attribute.Relation<
      'api::timeline.timeline',
      'manyToOne',
      'api::relaxation-sound.relaxation-sound'
    > &
      Attribute.Private;
    educate_video: Attribute.Relation<
      'api::timeline.timeline',
      'manyToOne',
      'api::educate-video.educate-video'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTipTip extends Schema.CollectionType {
  collectionName: 'tips';
  info: {
    singularName: 'tip';
    pluralName: 'tips';
    displayName: 'Tip';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tags: Attribute.Relation<'api::tip.tip', 'oneToMany', 'api::tag.tag'>;
    instruction: Attribute.Relation<
      'api::tip.tip',
      'manyToOne',
      'api::instruction.instruction'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tip.tip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tip.tip', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tip.tip',
      'oneToMany',
      'api::tip.tip'
    >;
    locale: Attribute.String;
  };
}

export interface ApiUserEpisodeTriggerUserEpisodeTrigger
  extends Schema.CollectionType {
  collectionName: 'user_episode_triggers';
  info: {
    singularName: 'user-episode-trigger';
    pluralName: 'user-episode-triggers';
    displayName: 'User episode trigger';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Datetime: Attribute.DateTime &
      Attribute.Required &
      Attribute.DefaultTo<'2024-02-06T23:15:00.000Z'>;
    details: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 320;
      }>;
    pictures: Attribute.Media;
    audio: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-episode-trigger.user-episode-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-episode-trigger.user-episode-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserReactionUserReaction extends Schema.CollectionType {
  collectionName: 'user_reactions';
  info: {
    singularName: 'user-reaction';
    pluralName: 'user-reactions';
    displayName: 'User Reaction';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    reaction: Attribute.Enumeration<['LIKE', 'DESLIKE']> &
      Attribute.Required &
      Attribute.DefaultTo<'LIKE'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-reaction.user-reaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-reaction.user-reaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::animation.animation': ApiAnimationAnimation;
      'api::article.article': ApiArticleArticle;
      'api::breathing-exercise.breathing-exercise': ApiBreathingExerciseBreathingExercise;
      'api::educate-video.educate-video': ApiEducateVideoEducateVideo;
      'api::episode.episode': ApiEpisodeEpisode;
      'api::episode-trigger.episode-trigger': ApiEpisodeTriggerEpisodeTrigger;
      'api::feature-flag.feature-flag': ApiFeatureFlagFeatureFlag;
      'api::instruction.instruction': ApiInstructionInstruction;
      'api::mood-status.mood-status': ApiMoodStatusMoodStatus;
      'api::mood-tracking.mood-tracking': ApiMoodTrackingMoodTracking;
      'api::on-boarding.on-boarding': ApiOnBoardingOnBoarding;
      'api::panic-attack-symptom.panic-attack-symptom': ApiPanicAttackSymptomPanicAttackSymptom;
      'api::relaxation-sound.relaxation-sound': ApiRelaxationSoundRelaxationSound;
      'api::relaxation-technique.relaxation-technique': ApiRelaxationTechniqueRelaxationTechnique;
      'api::stress-reduction-tip.stress-reduction-tip': ApiStressReductionTipStressReductionTip;
      'api::tag.tag': ApiTagTag;
      'api::terms-and-condition.terms-and-condition': ApiTermsAndConditionTermsAndCondition;
      'api::timeline.timeline': ApiTimelineTimeline;
      'api::tip.tip': ApiTipTip;
      'api::user-episode-trigger.user-episode-trigger': ApiUserEpisodeTriggerUserEpisodeTrigger;
      'api::user-reaction.user-reaction': ApiUserReactionUserReaction;
    }
  }
}
