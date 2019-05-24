/**
 * @module plugins/toc
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { debounce } from 'lodash-es';

/**
 * The table of contents plugin gives you the ability to show specific items in an outline
 * view that allows the user to navigate through the document
 *
 */
export default class TableOfContentsPlugin extends Plugin {

	/**
   * @inheritDoc
   */
	static get pluginName() {
		return 'TableOfContents';
	}

	/**
	 * Validate if an item is a DOM node
	 * 
	 * @param  {String|Element} item The item to check for
	 * @param  {String} name 		 The name of the item
	 * @return {Element}			 Target element if a match is found
	 */
	static validateNode(item, name) {
		if (!item) {
			throw new Error(`Invalid option passed for ${name}. A valid ${name} selector or element must be provided`);
		} else {
			if (typeof item === 'string') {
				const element = document.querySelector(item);
				if (!element) {
					throw new Error(`Could not find a matching element as table of contents ${name} with selector ${item}`);
				} else {
					return element;
				}
			} else {
				return item;
			}
		}
	}

	/**
	 * Validate the plugin options
	 * @param  {Object} Plugin options
	 * @return {Object} Normalized and parsed options
	 */
	static validateOptions(options) {
		let parsed = {};
		parsed.trigger = TableOfContentsPlugin.validateNode(options.trigger, 'trigger');
		parsed.target = TableOfContentsPlugin.validateNode(options.target, 'target');
		if (typeof options.query !== 'string') {
			throw new Error('The query to select items for the outline must be a valid DOM selector');
		}
		parsed.query = options.query;
		const refreshDelay = Number(options.refreshDelay);
		if (isNaN(refreshDelay)) {
			throw new Error('Refresh delay must be a number (denotes number of seconds to wait before refresh)');
		}
		parsed.refreshDelay = refreshDelay;
		return parsed;
	}

	init() {

		let options = this.editor.config.get( 'tableOfContents' );
		// Validate the options
		options = TableOfContentsPlugin.validateOptions(options);

		this.query = options.query;

		// Setup initial outline DOM element
		this.setupOutlineElement(options.target);

		// Setup event listeners on trigger
		this.setupEventListeners(options.trigger);

		// Debounce
		this.rebuildOutline = debounce(this.rebuildOutline.bind(this), options.refreshDelay * 1000);

		// Setup listener on editor and debounce changes
		this.editor.model.document.on( 'change:data', () => {
		    this.rebuildOutline();
		} );
	}

	/**
	 * Setup an outline element to respond and show outlines
	 * @param  {Element} element The element to use for showing table of contentents
	 */
	setupOutlineElement(element) {
		this.outlineView = element;
		this.outlineView.style.display = 'none';
	}


	/**
	 * Setup event listeners on the given element
	 * 
	 * @param  {Element} The element to toggle outline on
	 */
	setupEventListeners(element) {
		element.addEventListener('click', () => {
			// Toggle outline view
			const display = this.outlineView.style.display;
			this.outlineView.style.display = display === 'block' ? 'none' : 'block';
		});
	}

	rebuildOutline() {
		const element = this.editor.ui.editor.sourceElement;
		if (element) {
			let innerHTML = '';
			let matches = element.querySelectorAll(this.query);
			for (let match of matches) {
				innerHTML += '<h4>' + match.textContent + '</h4>';
			}
			this.outlineView.innerHTML = innerHTML;
		}
	}
}

/**
 * The table of contents options
 *
 * 
 *
 *    BalloonEditor
 *      .create( editorElement, {
 *        tableOfContents: {
 			refreshDelay: 2, // 2 seconds later (debounced)
 			query: '.ck-annotated-section', // The Query selector to use
 *          trigger: '#trigger' // or the actual element itself,
 *          target: '#outline' // or actual table of contents target
 *        }
 *    } )
 *    .then( ... )
 *    .catch( ... );
 *
 */
