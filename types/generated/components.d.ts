import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonTextContent extends Schema.Component {
  collectionName: 'components_common_text_contents';
  info: {
    displayName: 'textContent';
    icon: 'pencil';
  };
  attributes: {
    richText: Attribute.Blocks;
  };
}

export interface CommonPicture extends Schema.Component {
  collectionName: 'components_common_pictures';
  info: {
    displayName: 'picture';
    icon: 'landscape';
  };
  attributes: {
    picture: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface CommonChapter extends Schema.Component {
  collectionName: 'components_common_chapters';
  info: {
    displayName: 'chapter';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.text-content': CommonTextContent;
      'common.picture': CommonPicture;
      'common.chapter': CommonChapter;
    }
  }
}
