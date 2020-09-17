(function () {
	'use strict';

	var addGrid = {
		exec: function (editor) {
			var row = editor.document.createElement('div');
			row.addClass('row');
			row.appendHtml('<div class="col"><br></div>');
			row.appendHtml('<div class="col"><br></div>');
			editor.insertElement(row);
		}
	}

	var addCol = {
		exec: function (editor) {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			var row = element.getAscendant(function (el) {
				return el.hasClass('row');
			}, true);

			var col = editor.document.createElement('div');
			col.addClass('col');
			col.appendHtml('<br>');
			row.append(col);
		}
	}

	var addParagraph = {
		exec: function (editor) {
			var paragraph = editor.document.createElement('p');
			paragraph.appendHtml('<br>');
			editor.insertElement(paragraph);
		}
	}

	CKEDITOR.plugins.add('grid', {
		init: function (editor) {

			CKEDITOR.document.appendStyleSheet(this.path + 'css/style.css');
			editor.addContentsCss(this.path + 'css/bootstrap-grid.min.css');

			// Add grid command
			editor.addCommand('addGrid', addGrid);
			editor.ui.addButton('addGrid', {
				label: 'Ajouter une grille',
				command: 'addGrid',
				toolbar: 'insert',
				icon: this.path + 'icons/grid.png'
			});

			// Edit row command
			editor.addCommand('editRow', new CKEDITOR.dialogCommand('editRowDialog'));
			CKEDITOR.dialog.add('editRowDialog', this.path + 'dialogs/editRow.js');

			// Add col command
			editor.addCommand('addCol', addCol);

			// Edit col command
			editor.addCommand('editCol', new CKEDITOR.dialogCommand('editColDialog'));
			CKEDITOR.dialog.add('editColDialog', this.path + 'dialogs/editCol.js');

			// Add paragraph command
			editor.addCommand('addParagraph', addParagraph);

			if (editor.contextMenu) {
				editor.addMenuGroup('gridGroup');

				// Add grid
				editor.addMenuItem('addGridItem', {
					label: 'Ajouter une grille',
					command: 'addGrid',
					group: 'gridGroup'
				});

				editor.contextMenu.addListener(function (element) {
					return { addGridItem: CKEDITOR.TRISTATE_OFF };
				});

				// Edit row
				editor.addMenuItem('editRowItem', {
					label: 'Modifier la grille',
					command: 'editRow',
					group: 'gridGroup'
				});

				editor.contextMenu.addListener(function (element) {
					if (element.getAscendant(function (el) {
						return el.hasClass && el.hasClass('row');
					}, true)) {
						return { editRowItem: CKEDITOR.TRISTATE_OFF };
					}
				});

				// Add col
				editor.addMenuItem('addColItem', {
					label: 'Ajouter une colonne',
					command: 'addCol',
					group: 'gridGroup'
				});

				editor.contextMenu.addListener(function (element) {
					if (element.getAscendant(function (el) {
						return el.hasClass && el.hasClass('row');
					}, true)) {
						return { addColItem: CKEDITOR.TRISTATE_OFF };
					}
				});

				// Edit col
				editor.addMenuItem('editColItem', {
					label: 'Modifier la colonne',
					command: 'editCol',
					group: 'gridGroup'
				});

				editor.contextMenu.addListener(function (element) {
					if (element.getAscendant(function (el) {
						return el.hasClass && el.hasClass('col');
					}, true)) {
						return { editColItem: CKEDITOR.TRISTATE_OFF };
					}
				});


				// Add paragraph
				editor.addMenuGroup('paragraphGroup');
				editor.addMenuItem('addParagraphItem', {
					label: 'Ajouter un paragraphe',
					command: 'addParagraph',
					group: 'paragraphGroup'
				});

				editor.contextMenu.addListener(function (element) {
					return { addParagraphItem: CKEDITOR.TRISTATE_OFF };
				});

			}
		}
	});
})();
