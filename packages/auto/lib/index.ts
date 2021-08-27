export interface Dictionary<T> { [key: string]: T; }
export type AsyncAutoTasks<R extends Dictionary<any>> = { [K in keyof R]: AsyncAutoTask<R[K], R> };
export type AsyncAutoTask<R1, R extends Dictionary<any>> = AsyncAutoTaskFunctionWithoutDependencies<R1> | Array<keyof R | AsyncAutoTaskFunction<R1, R>>;
export interface AsyncAutoTaskFunctionWithoutDependencies<R1> { (): R1; }
export interface AsyncAutoTaskFunction<R1, R extends Dictionary<any>> { (results: R): R1; }


type Returnable = (...args: any) => any;
type PromiseResult<T> = ReturnType<T extends Returnable ? T : Returnable> extends PromiseLike<infer U> ? U : T;

type Fn<R> = (results: { [K in keyof R]: PromiseResult<R[K]> }) => (Promise<unknown> | unknown)
// type Key<R> = Fn<R> | { fn: Fn<R>, dependencies: Array<keyof R> };
type Key<R, V> = { fn: Fn<R>, dependencies: Array<keyof R> };
export function promiseAuto<T extends { [K in keyof T]: Key<T, T[K]>}>(tasks: T): Promise<void>

export function promiseAuto(
  promiseObj: Dictionary<Function>,
  
) {
  return new Promise((resolve, reject) => {

  });
}

const test = async () => {
  const b = await promiseAuto({
    a: () => 1,
    b: {
      dependencies: ['a'],
      fn: (asd) => 1,
    },
    c: () => 1,
  });
};

// import { auto } from 'async';

// const x = async () => {
//   const y = await auto({
//     get_data: function(callback) {
//         console.log('in get_data');
//         // async code to get some data
//         callback(null, 'data');
//     },
//     make_folder: function(callback) {
//         console.log('in make_folder');
//         // async code to create a directory to store a file in
//         // this is run at the same time as getting the data
//         callback(null, 'folder');
//     },
//     write_file: ['get_data', 'make_folder', function(results, callback) {
//         // once there is some data and the directory exists,
//         // write the data to a file in the directory
//         callback(null, 'filename');
//     }],
//     email_link: ['write_file', function(results, callback) {
//         // once the file is written let's email a link to it...
//         callback(null, {'file':results.write_file, 'email':'user@example.com'});
//     }]
//   });
// };
