/**
 * @module table/commands/annotatetablecommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import { findAncestor } from './utils';

/**
 * Annotate table command
 *
 * The command is registered by {@link module:table/tableediting~TableEditing} as `'annotateTable'
 *
 *
 * To annotate a table execute the following command:
 *
 *    editor.execute( 'annotateTable' );
 *
 * @extends module:core/command~Command
 */
export default class AnnotateTableCommand extends Command {
	/**
   * Creates a new `AnnotateTableCommand` instance.
   *
   * @param {module:core/editor/editor~Editor} editor An editor on which this command will be used.
   * @param {Object} options
   * @param {String} [options.value="content-table"] The semantic type of this table.
   * Supported options are `formatting-table`, `content-table`, `question-table`
   */
	constructor( editor, options = {} ) {
		super( editor );
		this.tableType = options.value;
	}

	/**
   * @inheritDoc
   */
	refresh() {
		const selection = this.editor.model.document.selection;
		const element = selection && selection.getSelectedElement() ? selection.getSelectedElement() : {};
		this.isEnabled = element.name === 'table' ? true : false;
		if(element.name === 'table') {
			this.value = element.getAttribute( 'tableType' );
		}
	}

	/**
   * Executes the command.
   *
   * Depending on the command's {@link #order} value, it inserts a column to the `'left'` or `'right'` of the column
   * in which the selection is set.
   *
   * @fires execute
   */
	execute( options = {} ) {
		const editor = this.editor;
		const model = editor.model;
		const selection = editor.model.document.selection;
		const table = selection.getSelectedElement();
		if ( !table ) {
			return;
		}
		const tableType = options.value;
		let cellAnnotatedValue = undefined;
		if ( tableType === 'question-table' ) {
			cellAnnotatedValue = 'question';
		} else if ( cellAnnotatedValue === 'content-table' ) {
			cellAnnotatedValue = 'answer';
		}

		model.change( writer => {
			// We will destroy the table an re-create so that secondary view updates
			writer.setAttribute( 'tableType', tableType, table );
		} );
	}

	/**
   * Checks if a table cell is in the heading section.
   *
   * @param {module:engine/model/element~Element} tableCell
   * @param {module:engine/model/element~Element} table
   * @returns {Boolean}
   * @private
   */
	_isInHeading( tableCell, table ) {
		const headingColumns = parseInt( table.getAttribute( 'headingColumns' ) || 0 );

		const tableUtils = this.editor.plugins.get( 'TableUtils' );

		const { column } = tableUtils.getCellLocation( tableCell );

		return !!headingColumns && column < headingColumns;
	}
}
