/**
 * @module highlight/highlight
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AnnotateTextUI from './AnnotateTextUI';
import AnnotateTextEditing from './AnnotateTextEditing';

/**
 * The TextAnnotation plugin allows the user to highlight and mark different portion of an editable document
 * with semantic attributes. For e.g given  "<p>Please describe your approach towards investment risk mitigation.</p>"
 *
 * The paragraph element can be given additional properties that identify it as a `question`.
 *
 * The default set of annotations and associated styles can be found as:
 *
 *        annotation:question
 *        annotation:guideline
 *        annotation:section
 *        annotation:answer
 *
 *
 */
export default class AnnotateTextPlugin extends Plugin {
	/**
   * @inheritDoc
   */
	static get requires() {
		return [ AnnotateTextEditing, AnnotateTextUI ];
	}

	/**
   * @inheritDoc
   */
	static get pluginName() {
		return 'AnnotateText';
	}
}

/**
 * The text annotation option descriptor.
 *
 * Each option can be specified in the form of an object that roughly conforms to the following form:
 *
 *    {
 *      model: 'question',
 *      class: 'cloudrfp-question-element',
 *      title: 'Question',
 *      color: '#212121'
 *    }
 *
 * The available highlight options. The default value is:
 *
 *    annotations: [
 *      {
 *        model: 'question',
 *        class: 'cloudrfp-question-element',
 *        title: 'Question',
 *        color: '#212121'
 *      },
 *      {
 *        model: 'answer',
 *        class: 'cloudrfp-answer-element',
 *        title: 'Answer',
 *        color: 'gray'
 *      },
 *      {
 *        model: 'section',
 *        class: 'cloudrfp-section-element',
 *        title: 'Section',
 *        color: 'green'
 *      },
 *      {
 *        model: 'guideline',
 *        class: 'cloudrfp-guideline-element',
 *        title: 'Guideline',
 *        color: 'magenta'
 *      }
 *    ]
 *
 *
 *    ClassicEditor
 *      .create( editorElement, {
 *        annotateText: {
 *          options: [
 *            {
 *            model: 'question',
 *            class: 'cloudrfp-question-element',
 *            title: 'Question',
 *            color: '#212121'
 *            },
 *            {
 *            model: 'answer',
 *            class: 'cloudrfp-answer-element',
 *            title: 'Answer',
 *            color: 'gray'
 *            },
 *            ...
 *          ]
 *        }
 *    } )
 *    .then( ... )
 *    .catch( ... );
 *
 */
