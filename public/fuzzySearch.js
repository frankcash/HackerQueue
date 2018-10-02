'use strict';

function fuzzySearchFilterFactory() {
  let fuzzySearch;
  return function (input, pattern, dataKey, createSearch) {
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
  this.lowerCasedItems = items.map(item => {
    return dataKey ? item[dataKey].toLowerCase() : item.toLowerCase();
  });
  this.index = this.createIndex();
  this.index2 = this.createIndex2();
  this.dumpIndex();
  this.dumpIndex2();
}

FuzzySearch.prototype.createIndex = function () {
  const items = this.lowerCasedItems;
  const length = this.length;
  let index = {};
  let word;
  let wordLength;
  let uniqueLettersInWord;
  let letter;
  for (let i = 0; i < length; i++) {
    word = items[i];
    wordLength = word.length;
    uniqueLettersInWord = {};
    for (let j = 0; j < wordLength; j++) {
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
  const items = this.lowerCasedItems;
  const length = this.length;
  let index = {};
  let word = "";
  let wordLength = 0;
  let uniqueLettersInWord = {};
  let uniqueLettersInRestOfWord = {};
  let letter = "";
  let index2 = {};
  let restOfWord = "";
  let restOfWordLength = 0;
  for (let i = 0; i < length; i++) {
    word = items[i];
    wordLength = word.length;
    uniqueLettersInWord = {};
    for (let j = 0; j < wordLength - 1; j++) {
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
        for (let k = 0; k < restOfWordLength; k++) {
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
  const index = this.index;
  let humanReadableIndex = {};
  for (let key in index) {
    humanReadableIndex[key] = [];
    for (let i = 0; i < index[key].length; i++) {
      humanReadableIndex[key].push(this.items[index[key][i]]);
    }
  }
};

FuzzySearch.prototype.dumpIndex2 = function () {
  const index = this.index2;
  let twoLetters;
  let humanReadableIndex = {};
  for (let key1 in index) {
    for (let key2 in index[key1]) {
      twoLetters = "'" + key1 + key2 + "'";
      humanReadableIndex[twoLetters] = [];
      for (let i = 0; i < index[key1][key2].length; i++) {
        humanReadableIndex[twoLetters].push(this.items[index[key1][key2][i]]);
      }
    }
  }
};

FuzzySearch.prototype.match = function (string, pattern) {
  const stringLen = string.length;
  const patternLen = pattern.length;
  let matchLength = 0
  for (let i = 0, j = 0; i < patternLen && j < stringLen; j++) {
    if (pattern[i] === string[j]) {
      i++;
      matchLength++;
    }
  }
  return matchLength === patternLen;
};

FuzzySearch.prototype.search = function (pattern) {
  pattern = pattern.toLowerCase();
  const lowercasedItems = this.lowerCasedItems;
  const items = this.items;
  const patternLen = pattern.length;
  const wordIndexes = (patternLen > 1 ? this.index2[pattern[0]][pattern[1]] : this.index[pattern[0]]) || [];
  const wordIndexlength = wordIndexes.length;
  let results = [];
  let wordIndex;
  for (let i = 0; i < wordIndexlength; i++) {
    wordIndex = wordIndexes[i];
    if (this.match(lowercasedItems[wordIndex], pattern)) {
      results.push(items[wordIndex]);
    }
  }
  return results;
};