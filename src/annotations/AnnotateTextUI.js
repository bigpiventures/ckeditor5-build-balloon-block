/**
 * Adapted from https://raw.githubusercontent.com/ckeditor/ckeditor5-highlight/master/src/highlightui.js
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import '../../theme/annotation.css';

/**
 * The default annotate UI plugin. It introduces:
 *
 * * The `'annotate'` dropdown,
 * * The `'removeAnnotation'` and `'annotation:*'` buttons.
 *
 * The default configuration includes the following buttons:
 *
 *        annotation:question
 *        annotation:guideline
 *        annotation:section
 *        annotation:answer
 *
 *
 * @extends module:core/plugin~Plugin
 */
export default class AnnotateTextUI extends Plugin {
	/**
   * Returns the localized option titles provided by the plugin.
   *
   * The following localized titles corresponding with default
   * {@link module:highlight/highlight~HighlightConfig#options} are available:
   *
   * * `'Question'`,
   * * `'Section'`,
   * * `'Guideline'`,
   * * `'Answer'`,
   *
   * @readonly
   * @type {Object.<String,String>}
   */
	get localizedOptionTitles() {
		const t = this.editor.t;
		const ret = {};
		this._ops.forEach(o => {
			ret[o.title] = t(o.title);
		});
		return ret;
	}

	/**
   * @inheritDoc
   */
	static get pluginName() {
		return 'AnnotateTextUI';
	}

	/**
   * @inheritDoc
   */
	init() {
		const options = this.editor.config.get('annotateText.options');
		this._ops = options;
		for (const option of options) {
			this._addAnnotationButtons(option);
		}
		this.value = null;
	}

	/**
   * Creates toolbar buttons from the provided annotation option.
   *
   * @private
   */
	_addAnnotationButtons(option) {
		const command = this.editor.commands.get('annotateText');

		// TODO: change naming
		this._addButton(option.model, option.title, option.model, command, option.color);
	}

	/**
   * Internal method for creating annotation buttons.
   *
   * @param {String} model The model of the button.
   * @param {String} label The label for the button.
   * @param {Object} command The annotate text command
   * @param {String} color   The fill color to use for icon
   * @private
   */
	_addButton(model, label, value, command, color) {
		const name = 'annotation:' + model;
		const editor = this.editor;
		editor.ui.componentFactory.add(name, locale => {
			const buttonView = new ButtonView(locale);

			const localized = this.localizedOptionTitles[label] ? this.localizedOptionTitles[label] : label;

			// Set label and tooltip for the button here
			buttonView.set({
				class: `ck-annotated-${model}-button`,
				label: localized,
				tooltip: localized,
				withText: true
			});
			buttonView.on('execute', () => {
				editor.execute('annotateText', { value });
				editor.editing.view.focus();
				if (this.value !== value) {
					this.value = value;
					buttonView.set({
						labelStyle: `font-size:12px;background:${color};padding:5px 10px`,
					});
				} else {
					buttonView.set({
						labelStyle: ''
					});
				}
			});
			buttonView.bind('isEnabled').to(command, 'isEnabled');
			buttonView.bind('isOn').to(command, 'value', value => value === model);
			buttonView.fillColor = color || 'lightgray';

			return buttonView;
		});
	}
}
