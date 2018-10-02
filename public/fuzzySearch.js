'use strict';

function fuzzySearchFilterFactory() {
  var fuzzySearch;
  return function (input, pattern, dataKey, createSearch) {
    console.log(input)
    if (createSearch && input && input.length) {
      fuzzySearch = new FuzzySearch(input, dataKey);
    }
    if (pattern && fuzzySearch) {
      return fuzzySearch.search(pattern.toLowerCase());
    } else {
      return input;
    }
  };
}

angular.module("app").filter('fuzzy', fuzzySearchFilterFactory);

function FuzzySearch(items, dataKey) {
  this.items = items;
  this.length = items.length;
  this.lowerCasedItems = [];
  for (var i = 0; i < this.length; i++) {
    if (dataKey) {
      this.lowerCasedItems.push(items[i][dataKey].toLowerCase());
    } else {
      this.lowerCasedItems.push(items[i].toLowerCase());
    }
  }
  this.index = this.createIndex();
  this.index2 = this.createIndex2();
  this.dumpIndex();
  this.dumpIndex2();
}

FuzzySearch.prototype.createIndex = function () {
  var items = this.lowerCasedItems;
  var length = this.length;
  var i = 0, j = 0;
  var index = {};
  var word;
  var wordLength;
  var uniqueLettersInWord;
  var letter;
  for (i = 0; i < length; i++) {
    word = items[i];
    wordLength = word.length;
    uniqueLettersInWord = {};
    for (j = 0; j < wordLength; j++) {
      letter = word[j];
      if (!uniqueLettersInWord[letter]) {
        uniqueLettersInWord[letter] = true;
        if (!index[letter]) {
          index[letter] = [i];
        } else {
          index[letter].push(i);
        }
      }
    }
  }
  return index;
};

FuzzySearch.prototype.createIndex2 = function () {
  var items = this.lowerCasedItems;
  var length = this.length;
  var i = 0, j = 0;
  var index = {};
  var word = "";
  var wordLength = 0;
  var uniqueLettersInWord = {};
  var uniqueLettersInRestOfWord = {};
  var letter = "";
  var index2 = {};
  var k = 0;
  var restOfWord = "";
  var restOfWordLength = 0;
  var j = 0;
  for (i = 0; i < length; i++) {
    word = items[i];
    wordLength = word.length;
    uniqueLettersInWord = {};
    for (j = 0; j < wordLength - 1; j++) {
      letter = word[j];
      if (!uniqueLettersInWord[letter]) {
        uniqueLettersInWord[letter] = true;
        restOfWord = word.substr(j + 1);
        restOfWordLength = restOfWord.length;
        if (!index[letter]) {
          index2 = index[letter] = {};
        } else {
          index2 = index[letter];
        }
        uniqueLettersInRestOfWord = {};
        for (k = 0; k < restOfWordLength; k++) {
          letter = restOfWord[k];
          if (!uniqueLettersInRestOfWord[letter]) {
            uniqueLettersInRestOfWord[letter] = true;
            if (!index2[letter]) {
              index2[letter] = [i];
            } else {
              index2[letter].push(i);
            }
          }
        }
      }
    }
  }
  return index;
};

FuzzySearch.prototype.dumpIndex = function () {
  var index = this.index;
  var humanReadableIndex = {};
  for (var key in index) {
    humanReadableIndex[key] = [];
    for (var i = 0; i < index[key].length; i++) {
      humanReadableIndex[key].push(this.items[index[key][i]]);
    }
  }
};

FuzzySearch.prototype.dumpIndex2 = function () {
  var index = this.index2;
  var twoLetters;
  var humanReadableIndex = {};
  for (var key1 in index) {
    for (var key2 in index[key1]) {
      twoLetters = "'" + key1 + key2 + "'";
      humanReadableIndex[twoLetters] = [];
      for (var i = 0; i < index[key1][key2].length; i++) {
        humanReadableIndex[twoLetters].push(this.items[index[key1][key2][i]]);
      }
    }
  }
};

FuzzySearch.prototype.match = function (string, pattern) {
  var i = 0;
  var j = 0;
  var stringLen = string.length;
  var patternLen = pattern.length;
  for (i = 0, j = 0; i < patternLen && j < stringLen; j++) {
    if (pattern[i] === string[j]) {
      i++;
    }
  }
  return i === patternLen;
};

FuzzySearch.prototype.search = function (pattern) {
  pattern = pattern.toLowerCase();
  var results = [];
  var lowercasedItems = this.lowerCasedItems;
  var patternLen = pattern.length;
  var wordIndexes = (patternLen > 1 ? this.index2[pattern[0]][pattern[1]] : this.index[pattern[0]]) || [];
  var wordIndexlength = wordIndexes.length;
  var items = this.items;
  var i = 0;
  var wordIndex;
  for (i = 0; i < wordIndexlength; i++) {
    wordIndex = wordIndexes[i];
    if (this.match(lowercasedItems[wordIndex], pattern)) {
      results.push(items[wordIndex]);
    }
  }
  return results;
};