export function pathJoin(arr, sep) {
  sep = sep || '/';
  var replace   = new RegExp(sep+'{1,}', 'g');
  return arr.join(sep).replace(replace, sep);
};
