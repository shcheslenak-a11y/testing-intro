const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products).map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const sub = products.filter((p) => [1, 3, 4].includes(p.id));
    expect(sortProductsByPrice(sub, 'asc').map((p) => p.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    let sub = [];
    [3, 1, 4].forEach((id) => sub.push(products.filter((p) => p.id === id)[0]));
    expect(sortProductsByPrice(sub, 'desc').map((p) => p.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    let sub = [];
    [5, 2, 6].forEach((id) => sub.push(products.filter((p) => p.id === id)[0]));
    expect(sortProductsByPrice(sub, 'desc').map((p) => p.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const sub = products.filter((p) => [1, 3, 4].includes(p.id));
    sortProductsByPrice(sub, 'asc');
    expect(sub.map((p) => p.id)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const sub = products.filter((p) => [1, 3, 4].includes(p.id));
    sortProductsByPrice(sub, 'decs');
    expect(sub.map((p) => p.id)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products, 'decs');
    expect(products.map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
