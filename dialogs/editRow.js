(function () {
	'use strict';

	CKEDITOR.dialog.add('editRowDialog', function (editor) {
		return {
			title: 'Modifier la grille',
			minWidth: 500,
			minHeight: 200,
			contents: [
				{
					id: 'grid-edit-row',
					label: 'Alignements',
					elements: [
						{
							id: 'row-vertical-align',
							type: 'select',
							label: 'Alignement vertical',
							items: [
								['Auto', '-1'],
								['Haut', 'align-items-start'],
								['Centre', 'align-items-center'],
								['Bas', 'align-items-end']
							], 'default': '-1',
							setup: function (element) {
								var cssClass = element.getAttribute('class');
								if (cssClass.indexOf('align-items-start') != -1) {
									this.setValue('align-items-start');
								} else if (cssClass.indexOf('align-items-center') != -1) {
									this.setValue('align-items-center');
								} else if (cssClass.indexOf('align-items-end') != -1) {
									this.setValue('align-items-end');
								}
							}
						},
						{
							id: 'row-horizontal-align',
							type: 'select',
							label: 'Alignement horizontal',
							items: [
								['Auto', '-1'],
								['Début de ligne', 'justify-content-start'],
								['Centre', 'justify-content-center'],
								['Fin de ligne', 'justify-content-end'],
								['Équilibré', 'justify-content-around'],
								['Espacé', 'justify-content-between']
							], 'default': '-1',
							setup: function (element) {
								var cssClass = element.getAttribute('class');
								if (cssClass.indexOf('justify-content-start') != -1) {
									this.setValue('justify-content-start');
								} else if (cssClass.indexOf('justify-content-center') != -1) {
									this.setValue('justify-content-center');
								} else if (cssClass.indexOf('justify-content-end') != -1) {
									this.setValue('justify-content-end');
								} else if (cssClass.indexOf('justify-content-around') != -1) {
									this.setValue('justify-content-around');
								} else if (cssClass.indexOf('justify-content-between') != -1) {
									this.setValue('justify-content-between');
								}
							}
						}
					]
				}
			],
			onShow: function () {
				var selection = editor.getSelection();
				var element = selection.getStartElement();
				var row = element.getAscendant(function (el) {
					return el.hasClass('row');
				}, true);
				this.row = row;

				this.setupContent(this.row);
			},
			onOk: function () {
				var dialog = this;
				var cssClass = 'row';

				var valign = dialog.getValueOf('grid-edit-row', 'row-vertical-align');
				if (valign != -1) {
					cssClass += ' ' + valign;
				}

				var halign = dialog.getValueOf('grid-edit-row', 'row-horizontal-align');
				if (halign != -1) {
					cssClass += ' ' + halign;
				}

				dialog.row.setAttribute('class', cssClass);
			}
		}
	});
})();
