/**
 * Adapted from: https://raw.githubusercontent.com/ckeditor/ckeditor5-highlight/master/src/highlightcommand.js
 *
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

/**
 *
 * The text annotation command will annotate a range of text or single text element by attaching a semantic `type`.
 *
 * e.g
 *
 *    editor.execute( 'annotateText', { value: 'section' } );
 *
 * **Note**: Executing the command without a value removes the attribute from the model. If the selection is collapsed
 * inside a text with the `annotation` attribute, the command will remove the attribute from the entire range
 * of that text.
 *
 * @extends module:core/command~Command
 */
export default class AnnotateTextCommand extends Command {
	/**
   * @inheritDoc
   */
	refresh() {
		const model = this.editor.model;
		const doc = model.document;
		/**
     * A value indicating whether the command is active. If the selection has some annotation attribute,
     * it corresponds to the value of that attribute.
     *
     * @observable
     * @readonly
     */
		this._getValue();
		this.isEnabled = true;
	}

	/**
   * Executes the command.
   *
   * @protected
   * @param {Object} [options] Options for the executed command.
   * @param {String} [options.value] The value to apply.
   *
   * @fires execute
   */
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		const selection = document.selection;

		const annotation = options.value;

		model.change(writer => {
			const sbs = options.elements ? options.elements : Array.from(selection.getSelectedBlocks());
			const range = writer.createRange(writer.createPositionBefore(sbs[0]),
				writer.createPositionAfter(sbs[sbs.length - 1]));
			// Select everything until first and last block of selection
			writer.setSelection(writer.createSelection(range));
			const ranges = model.schema.getValidRanges(selection.getRanges(), 'annotation');
			for (const range of ranges) {
				if (annotation !== undefined) {
					if ((annotation === this.value || annotation === null) && !options.disableRemove) {
						writer.removeAttribute('annotation', range);
					} else {
						writer.setAttribute('annotation', annotation, range);
					}
				} else {
					writer.removeAttribute('annotation', range);
				}
			}
		});
	}

	/**
	 * Checks the command's {@link #value}.
	 *
	 * @private
	 * @returns {Boolean} The current value.
	 */
	_getValue() {
		const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());
		this.value = firstBlock._attrs.get('annotation');
	}
}
