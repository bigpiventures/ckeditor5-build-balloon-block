/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockToolbar from './block/blocktoolbar'; // v11.2.0
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from './table/table';
import TableToolbar from './table/tabletoolbar';
import TableOfContentsPlugin from './toc/TableOfContentsPlugin';
import AnnotateTextPlugin from './annotations/AnnotateTextPlugin';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

import '../theme/custom/globals.css';
import '../theme/theme.css';
import '../theme/custom/components/index.css';

export default class BalloonEditor extends BalloonEditorBase { }

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	BlockToolbar,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	AnnotateTextPlugin,
	TableOfContentsPlugin,
	Underline
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	blockToolbar: [
		'annotation:question',
		'|',
		'annotation:section',
		'|',
		'annotation:answer',
		'|',
		'annotation:guideline',
		// '|',
		// 'heading',
		// 'bulletedList',
		// 'numberedList',
		// 'imageUpload',
		// 'blockQuote',
		// 'insertTable',
		// 'mediaEmbed'
	],
	tableOfContents: {
		refreshDelay: 2,
		query: '.ck-annotated-section',
        trigger: '#trigger',
        target: '#outline'
    },
	toolbar: {
		items: [
			'bold',
			'italic',
			'underline',
			'link',
			'undo',
			'redo'
		]
	},
	annotateTable: {
		options: [
			{
				name: 'Formatting Table',
				value: 'formatting-table'
			},
			{
				name: 'Question Table',
				value: 'question-table'
			}, {
				name: 'Content-Table',
				value: 'content-table'
			}
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'splitTable',
			'annotateTable'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
