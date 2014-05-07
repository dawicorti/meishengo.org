/*
 * Module dependencies
 */

var _ = require('underscore');
var Backbone = require('backbone');

/*
 * Intersection View
 *
 * <mei-intersection> // main wrapper  
 *    <mei-horizontal-line>
 *    <mei-vertical-line>
 *    <mei-hoshi> // only if hoshi
 */

var IntersectionView = module.exports = Backbone.View.extend();

IntersectionView.prototype.tagName = 'mei-intersection';


/* Initialize basic template */

IntersectionView.prototype.initialize = function (opts) {
  this.row = opts.row;
  this.col = opts.col;
  this.gsize = opts.gsize;
  this.$el
    .append($('<mei-vertical-line>').addClass('draw'))
    .append($('<mei-horizontal-line>').addClass('draw'));

  if (this.row === 0) this.$el.addClass('top');
  if (this.row === this.gsize - 1) this.$el.addClass('bottom');
  if (this.col === 0) this.$el.addClass('left');
  if (this.col === this.gsize - 1) this.$el.addClass('right');
  if (this.isHoshi()) this.$el.append($('<mei-hoshi>').addClass('draw'));
};

/* Return if current intersection should be an hoshi  */

IntersectionView.prototype.isHoshi = function () {
  var gap = this.gsize > 9 ? 4 : 3;
  var isGapFromColWall = (this.col === gap - 1) || (this.gsize - this.col === gap);
  var isGapFromRowWall = (this.row === gap - 1) || (this.gsize - this.row === gap);
  var isRowCentered = (this.row === (this.gsize - 1) / 2) && this.gsize > 9;
  var isColCentered = (this.col === (this.gsize - 1) / 2) && this.gsize > 9;
  var isWallHoshi = (isGapFromRowWall || isGapFromColWall) && (isColCentered || isRowCentered);
  var isCornerHoshi = isGapFromColWall && isGapFromRowWall;
  var isCenterHoshi = isRowCentered && isColCentered;
  return isCornerHoshi || isWallHoshi || isCenterHoshi;
};