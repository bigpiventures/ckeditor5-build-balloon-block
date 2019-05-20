/**
 * Adapted from https://raw.githubusercontent.com/ckeditor/ckeditor5-highlight/master/src/highlightediting.js
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import AnnotateTextCommand from './AnnotateTextCommand';

/**
 *
 * The text annotation feature. It adds the TextAnnotation command and the `annotation` attribute in the editor model which renders in the
 * view as a `mark` element with custom class. The mark element adds additional styling as required.
 *
 *
 * @extends module:core/plugin~Plugin
 */
export default class AnnotateTextEditing extends Plugin {
	/**
   * @inheritDoc
   */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'annotateText', {
			options: [
				{
					model: 'section',
					title: 'Section',
					color: '#F8F883'
				},
				{
					model: 'question',
					title: 'Question',
					color: '#C5E6FF'
				},
				{
					model: 'answer',
					title: 'Answer',
					color: '#F7CAF5',
					highlightColor: '#ffffff'
				},
				{
					model: 'guideline',
					title: 'Guideline',
					color: '#9DFDE1'
				}
			]
		} );
	}

	/**
   * @inheritDoc
   */
	init() {
		const editor = this.editor;

		// Allow annotation attribute on text nodes.
		editor.model.schema.extend( '$block', { allowAttributes: 'annotation' } );

		const options = editor.config.get( 'annotateText.options' );

		editor.conversion.attributeToAttribute( _buildDefinition(options) );
		editor.commands.add( 'annotateText', new AnnotateTextCommand( editor ) );
	}
}

// Converts the options array to a converter definition.
//
// An array with configured options.
// @returns {module:engine/conversion/conversion~ConverterDefinition}
function _buildDefinition( options ) {
	const definition = {
		model: {
			key: 'annotation',
			values: []
		},
		view: {}
	};

	for ( const option of options ) {
		definition.model.values.push( option.model );
		definition.view[ option.model ] = {
			key: 'class',
			value: `ck-annotated-${ option.model }`
		};
	}
	return definition;
}
