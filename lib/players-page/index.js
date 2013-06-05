'use strict';

var _ = require('underscore');
var $ = require('jquery');
var TopMenu = require('top-menu');
var PlayersList = require('players-list');
var Footer = require('./footer');
var Search = require('search');

function PlayersPage() {
  _.bindAll(this);
  this.pageIndex = 0;
}

PlayersPage.prototype.onListVisible = function () {
  $('footer').html(new Footer({
    next: this.onNext,
    previous: this.onPrevious
  }).render().$el);
  $('header').append(new Search({
    change: this.onSearchChange
  }).render().$el);
};

PlayersPage.prototype.open = function () {
  $('header').html(new TopMenu('players').render().$el);

  this.playersList = new PlayersList({visible: this.onListVisible}).render();

  $('#content').html(this.playersList.$el);
};

PlayersPage.prototype.onNext = function () {
  var pageIndex = this.pageIndex + 1;

  if (this.playersList.openPage(pageIndex)) {
    this.pageIndex = pageIndex;
  }
};

PlayersPage.prototype.onPrevious = function () {
  var pageIndex = this.pageIndex - 1;

  if (this.playersList.openPage(pageIndex)) {
    this.pageIndex = pageIndex;
  }
};

PlayersPage.prototype.onSearchChange = function (text) {
  this.playersList.search(text);
};

module.exports = PlayersPage;