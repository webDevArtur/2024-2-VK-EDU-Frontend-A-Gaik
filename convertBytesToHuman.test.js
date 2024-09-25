/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(13)).toBe('13 B');
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(1610612736)).toBe('1.5 GB');
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB');
});

test('Проверка округления до 2 знаков после запятой', () => {
  expect(convertBytesToHuman(11345)).toBe('11.08 KB');
  expect(convertBytesToHuman(12112312)).toBe('11.55 MB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1678456344235)).toBe('1.53 TB');
});

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(NaN)).toBe(false);
  expect(convertBytesToHuman('string')).toBe(false);
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman(undefined)).toBe(false);
  expect(convertBytesToHuman({})).toBe(false);
  expect(convertBytesToHuman([])).toBe(false);
  expect(convertBytesToHuman(-20)).toBe(false);
  expect(convertBytesToHuman(0.1)).toBe(false);
});