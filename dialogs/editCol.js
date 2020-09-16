(function () {
	'use strict';

	var rangeLabels = ['auto', null, null, '25%', "33%", null, '50%', null, '66%', '75%', null, null, '100%'];

	/**
	* Créé un input de type range
	*
	* @param {string} id
	* @param {string} label
	* @param {string} min
	* @param {string} max
	* @param {number} defaultValue
	*/
	var getRangeElement = function (id, label, min = 0, max = 12, defaultValue = 0) {
		var inputRange = '<label for="' + id + '" class="cke_dialog_ui_labeled_label">' + label + '</label><div class="cke_dialog_ui_labeled_content d-flex flex-col"><input type="range" id="' + id + '" list="range-' + id + '" min="' + min + '" max="' + max + '" step="1" value="' + defaultValue + '">';

		var labelList = '<datalist id="range-' + id + '" class="label-10">';
		for (var i = min; i <= max; i++) {

			if (rangeLabels[i] != null) {
				labelList += '<option value="' + i + '" label="' + rangeLabels[i] + '">';
			} else {
				labelList += '<option value="' + i + '">';
			}
		}
		labelList += '</datalist>';

		var input = inputRange + labelList + '</div>';
		return input;
	}

	/**
	* Renvoi la valeur suivant les classes
	*
	* @param {string} type
	* @param {string} cssClasses
	* @param {number} size
	* @param {number} defaultValue
	*/
	var getClassValue = function (type, cssClasses, size, defaultValue = 0) {
		var matches = cssClasses.match(new RegExp(type + size + '-([0-9]+)'));
		if (matches) {
			return matches[1];
		} else {
			return defaultValue;
		}
	}

	CKEDITOR.dialog.add('editColDialog', function (editor) {
		return {
			title: 'Modifier la colonne',
			minWidth: 500,
			minHeight: 400,
			contents: [
				{
					id: 'grid-edit-col-width',
					label: 'Largeur',
					elements: [
						{
							id: 'col-width-xs',
							type: 'html',
							html: getRangeElement('col-width-xs', 'Écran < 576px'),
							setup: function (element) {
								this.getElement().getDocument().getById('col-width-xs').setValue(getClassValue('col', element.getAttribute('class'), ''));
							}
						}, {
							id: 'col-width-sm',
							type: 'html',
							html: getRangeElement('col-width-sm', 'Écran ≥ 576px'),
							setup: function (element) {
								this.getElement().getDocument().getById('col-width-sm').setValue(getClassValue('col', element.getAttribute('class'), '-sm', this.getElement().getDocument().getById('col-width-xs').getValue()));
							}
						}, {
							id: 'col-width-md',
							type: 'html',
							html: getRangeElement('col-width-md', 'Écran ≥ 768px'),
							setup: function (element) {
								this.getElement().getDocument().getById('col-width-md').setValue(getClassValue('col', element.getAttribute('class'), '-md', this.getElement().getDocument().getById('col-width-sm').getValue()));
							}
						}, {
							id: 'col-width-lg',
							type: 'html',
							html: getRangeElement('col-width-lg', 'Écran ≥ 992px'),
							setup: function (element) {
								this.getElement().getDocument().getById('col-width-lg').setValue(getClassValue('col', element.getAttribute('class'), '-lg', this.getElement().getDocument().getById('col-width-md').getValue()));
							}
						}, {
							id: 'col-width-xl',
							type: 'html',
							html: getRangeElement('col-width-xl', 'Écran ≥ 1200px'),
							setup: function (element) {
								this.getElement().getDocument().getById('col-width-xl').setValue(getClassValue('col', element.getAttribute('class'), '-xl', this.getElement().getDocument().getById('col-width-lg').getValue()));
							}
						}, {
							id: 'col-width-reset',
							type: 'button',
							label: 'Remise à zéro',
							onClick: function () {
								var document = this.getElement().getDocument();
								document.getById('col-width-xs').setValue(0);
								document.getById('col-width-sm').setValue(0);
								document.getById('col-width-md').setValue(0);
								document.getById('col-width-lg').setValue(0);
								document.getById('col-width-xl').setValue(0);
							}
						}
					]
				}, {
					id: 'grid-edit-col-offset',
					label: 'Décalage',
					elements: [
						{
							id: 'col-offset-xs',
							type: 'html',
							html: getRangeElement('col-offset-xs', 'Écran < 576px', 0, 11),
							setup: function (element) {
								this.getElement().getDocument().getById('col-offset-xs').setValue(getClassValue('offset', element.getAttribute('class'), ''));
							}
						}, {
							id: 'col-offset-sm',
							type: 'html',
							html: getRangeElement('col-offset-sm', 'Écran ≥ 576px', 0, 11),
							setup: function (element) {
								this.getElement().getDocument().getById('col-offset-sm').setValue(getClassValue('offset', element.getAttribute('class'), '-sm', this.getElement().getDocument().getById('col-offset-xs').getValue()));
							}
						}, {
							id: 'col-offset-md',
							type: 'html',
							html: getRangeElement('col-offset-md', 'Écran ≥ 768px', 0, 11),
							setup: function (element) {
								this.getElement().getDocument().getById('col-offset-md').setValue(getClassValue('offset', element.getAttribute('class'), '-md', this.getElement().getDocument().getById('col-offset-sm').getValue()));
							}
						}, {
							id: 'col-offset-lg',
							type: 'html',
							html: getRangeElement('col-offset-lg', 'Écran ≥ 992px', 0, 11),
							setup: function (element) {
								this.getElement().getDocument().getById('col-offset-lg').setValue(getClassValue('offset', element.getAttribute('class'), '-lg', this.getElement().getDocument().getById('col-offset-md').getValue()));
							}
						}, {
							id: 'col-offset-xl',
							type: 'html',
							html: getRangeElement('col-offset-xl', 'Écran ≥ 1200px', 0, 11),
							setup: function (element) {
								this.getElement().getDocument().getById('col-offset-xl').setValue(getClassValue('offset', element.getAttribute('class'), '-xl', this.getElement().getDocument().getById('col-offset-lg').getValue()));
							}
						}, {
							id: 'col-offset-reset',
							type: 'button',
							label: 'Remise à zéro',
							onClick: function () {
								var document = this.getElement().getDocument();
								document.getById('col-offset-xs').setValue(0);
								document.getById('col-offset-sm').setValue(0);
								document.getById('col-offset-md').setValue(0);
								document.getById('col-offset-lg').setValue(0);
								document.getById('col-offset-xl').setValue(0);
							}
						}
					]
				}
			],
			onShow: function () {
				var selection = editor.getSelection();
				var element = selection.getStartElement();
				var col = element.getAscendant(function (el) {
					return el.hasClass('col');
				}, true);
				this.col = col;

				this.setupContent(this.col);
			},
			onOk: function () {
				var dialog = this;
				var document = this.getElement().getDocument();
				var cssClass = 'col';

				// Width
				var xsWidth = document.getById('col-width-xs').getValue();
				var smWidth = document.getById('col-width-sm').getValue();
				var mdWidth = document.getById('col-width-md').getValue();
				var lgWidth = document.getById('col-width-lg').getValue();
				var xlWidth = document.getById('col-width-xl').getValue();

				if (xsWidth != 0) {
					cssClass += ' col-' + xsWidth;
				}
				if (smWidth != xsWidth) {
					cssClass += ' col-sm-' + smWidth;
				}
				if (mdWidth != smWidth) {
					cssClass += ' col-md-' + mdWidth;
				}
				if (lgWidth != mdWidth) {
					cssClass += ' col-lg-' + lgWidth;
				}
				if (xlWidth != lgWidth) {
					cssClass += ' col-xl-' + xlWidth;
				}

				// Offset
				var xsOffset = document.getById('col-offset-xs').getValue();
				var smOffset = document.getById('col-offset-sm').getValue();
				var mdOffset = document.getById('col-offset-md').getValue();
				var lgOffset = document.getById('col-offset-lg').getValue();
				var xlOffset = document.getById('col-offset-xl').getValue();

				if (xsOffset != 0) {
					cssClass += ' offset-' + xsOffset;
				}
				if (smOffset != xsOffset) {
					cssClass += ' offset-sm-' + smOffset;
				}
				if (mdOffset != smOffset) {
					cssClass += ' offset-md-' + mdOffset;
				}
				if (lgOffset != mdOffset) {
					cssClass += ' offset-lg-' + lgOffset;
				}
				if (xlOffset != lgOffset) {
					cssClass += ' offset-xl-' + xlOffset;
				}

				dialog.col.setAttribute('class', cssClass);
			}
		}
	});

})();
