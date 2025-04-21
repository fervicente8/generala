
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserFriendship
 * 
 */
export type UserFriendship = $Result.DefaultSelection<Prisma.$UserFriendshipPayload>
/**
 * Model UserStats
 * 
 */
export type UserStats = $Result.DefaultSelection<Prisma.$UserStatsPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GameUser
 * 
 */
export type GameUser = $Result.DefaultSelection<Prisma.$GameUserPayload>
/**
 * Model GameInvitation
 * 
 */
export type GameInvitation = $Result.DefaultSelection<Prisma.$GameInvitationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userFriendship`: Exposes CRUD operations for the **UserFriendship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserFriendships
    * const userFriendships = await prisma.userFriendship.findMany()
    * ```
    */
  get userFriendship(): Prisma.UserFriendshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userStats`: Exposes CRUD operations for the **UserStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStats
    * const userStats = await prisma.userStats.findMany()
    * ```
    */
  get userStats(): Prisma.UserStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameUser`: Exposes CRUD operations for the **GameUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameUsers
    * const gameUsers = await prisma.gameUser.findMany()
    * ```
    */
  get gameUser(): Prisma.GameUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameInvitation`: Exposes CRUD operations for the **GameInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameInvitations
    * const gameInvitations = await prisma.gameInvitation.findMany()
    * ```
    */
  get gameInvitation(): Prisma.GameInvitationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserFriendship: 'UserFriendship',
    UserStats: 'UserStats',
    Game: 'Game',
    GameUser: 'GameUser',
    GameInvitation: 'GameInvitation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userFriendship" | "userStats" | "game" | "gameUser" | "gameInvitation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserFriendship: {
        payload: Prisma.$UserFriendshipPayload<ExtArgs>
        fields: Prisma.UserFriendshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFriendshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFriendshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          findFirst: {
            args: Prisma.UserFriendshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFriendshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          findMany: {
            args: Prisma.UserFriendshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>[]
          }
          create: {
            args: Prisma.UserFriendshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          createMany: {
            args: Prisma.UserFriendshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserFriendshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>[]
          }
          delete: {
            args: Prisma.UserFriendshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          update: {
            args: Prisma.UserFriendshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          deleteMany: {
            args: Prisma.UserFriendshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserFriendshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserFriendshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>[]
          }
          upsert: {
            args: Prisma.UserFriendshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFriendshipPayload>
          }
          aggregate: {
            args: Prisma.UserFriendshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserFriendship>
          }
          groupBy: {
            args: Prisma.UserFriendshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserFriendshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserFriendshipCountArgs<ExtArgs>
            result: $Utils.Optional<UserFriendshipCountAggregateOutputType> | number
          }
        }
      }
      UserStats: {
        payload: Prisma.$UserStatsPayload<ExtArgs>
        fields: Prisma.UserStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findFirst: {
            args: Prisma.UserStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findMany: {
            args: Prisma.UserStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          create: {
            args: Prisma.UserStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          createMany: {
            args: Prisma.UserStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          delete: {
            args: Prisma.UserStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          update: {
            args: Prisma.UserStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          upsert: {
            args: Prisma.UserStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          aggregate: {
            args: Prisma.UserStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStats>
          }
          groupBy: {
            args: Prisma.UserStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserStatsCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GameUser: {
        payload: Prisma.$GameUserPayload<ExtArgs>
        fields: Prisma.GameUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          findFirst: {
            args: Prisma.GameUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          findMany: {
            args: Prisma.GameUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>[]
          }
          create: {
            args: Prisma.GameUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          createMany: {
            args: Prisma.GameUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>[]
          }
          delete: {
            args: Prisma.GameUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          update: {
            args: Prisma.GameUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          deleteMany: {
            args: Prisma.GameUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>[]
          }
          upsert: {
            args: Prisma.GameUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameUserPayload>
          }
          aggregate: {
            args: Prisma.GameUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameUser>
          }
          groupBy: {
            args: Prisma.GameUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameUserCountArgs<ExtArgs>
            result: $Utils.Optional<GameUserCountAggregateOutputType> | number
          }
        }
      }
      GameInvitation: {
        payload: Prisma.$GameInvitationPayload<ExtArgs>
        fields: Prisma.GameInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          findFirst: {
            args: Prisma.GameInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          findMany: {
            args: Prisma.GameInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>[]
          }
          create: {
            args: Prisma.GameInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          createMany: {
            args: Prisma.GameInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>[]
          }
          delete: {
            args: Prisma.GameInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          update: {
            args: Prisma.GameInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          deleteMany: {
            args: Prisma.GameInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>[]
          }
          upsert: {
            args: Prisma.GameInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameInvitationPayload>
          }
          aggregate: {
            args: Prisma.GameInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameInvitation>
          }
          groupBy: {
            args: Prisma.GameInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<GameInvitationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userFriendship?: UserFriendshipOmit
    userStats?: UserStatsOmit
    game?: GameOmit
    gameUser?: GameUserOmit
    gameInvitation?: GameInvitationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    games: number
    friendships: number
    friendOf: number
    sentInvitations: number
    receivedInvitations: number
    ownedGames: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | UserCountOutputTypeCountGamesArgs
    friendships?: boolean | UserCountOutputTypeCountFriendshipsArgs
    friendOf?: boolean | UserCountOutputTypeCountFriendOfArgs
    sentInvitations?: boolean | UserCountOutputTypeCountSentInvitationsArgs
    receivedInvitations?: boolean | UserCountOutputTypeCountReceivedInvitationsArgs
    ownedGames?: boolean | UserCountOutputTypeCountOwnedGamesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    players: number
    invitations: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | GameCountOutputTypeCountPlayersArgs
    invitations?: boolean | GameCountOutputTypeCountInvitationsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameUserWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameInvitationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    googleId: string | null
    name: string | null
    email: string | null
    password: string | null
    image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    googleId: string | null
    name: string | null
    email: string | null
    password: string | null
    image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    googleId: number
    name: number
    email: number
    password: number
    image: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    googleId?: true
    name?: true
    email?: true
    password?: true
    image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    googleId?: true
    name?: true
    email?: true
    password?: true
    image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    googleId?: true
    name?: true
    email?: true
    password?: true
    image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    googleId: string
    name: string
    email: string
    password: string | null
    image: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    stats?: boolean | User$statsArgs<ExtArgs>
    games?: boolean | User$gamesArgs<ExtArgs>
    friendships?: boolean | User$friendshipsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    ownedGames?: boolean | User$ownedGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    googleId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googleId" | "name" | "email" | "password" | "image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | User$statsArgs<ExtArgs>
    games?: boolean | User$gamesArgs<ExtArgs>
    friendships?: boolean | User$friendshipsArgs<ExtArgs>
    friendOf?: boolean | User$friendOfArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    ownedGames?: boolean | User$ownedGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      stats: Prisma.$UserStatsPayload<ExtArgs> | null
      games: Prisma.$GameUserPayload<ExtArgs>[]
      friendships: Prisma.$UserFriendshipPayload<ExtArgs>[]
      friendOf: Prisma.$UserFriendshipPayload<ExtArgs>[]
      sentInvitations: Prisma.$GameInvitationPayload<ExtArgs>[]
      receivedInvitations: Prisma.$GameInvitationPayload<ExtArgs>[]
      ownedGames: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      googleId: string
      name: string
      email: string
      password: string | null
      image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends User$statsArgs<ExtArgs> = {}>(args?: Subset<T, User$statsArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    games<T extends User$gamesArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendships<T extends User$friendshipsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendOf<T extends User$friendOfArgs<ExtArgs> = {}>(args?: Subset<T, User$friendOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentInvitations<T extends User$sentInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedInvitations<T extends User$receivedInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedGames<T extends User$ownedGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.stats
   */
  export type User$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    where?: UserStatsWhereInput
  }

  /**
   * User.games
   */
  export type User$gamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    where?: GameUserWhereInput
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    cursor?: GameUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameUserScalarFieldEnum | GameUserScalarFieldEnum[]
  }

  /**
   * User.friendships
   */
  export type User$friendshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    where?: UserFriendshipWhereInput
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    cursor?: UserFriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFriendshipScalarFieldEnum | UserFriendshipScalarFieldEnum[]
  }

  /**
   * User.friendOf
   */
  export type User$friendOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    where?: UserFriendshipWhereInput
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    cursor?: UserFriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFriendshipScalarFieldEnum | UserFriendshipScalarFieldEnum[]
  }

  /**
   * User.sentInvitations
   */
  export type User$sentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    where?: GameInvitationWhereInput
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    cursor?: GameInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * User.receivedInvitations
   */
  export type User$receivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    where?: GameInvitationWhereInput
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    cursor?: GameInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * User.ownedGames
   */
  export type User$ownedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserFriendship
   */

  export type AggregateUserFriendship = {
    _count: UserFriendshipCountAggregateOutputType | null
    _min: UserFriendshipMinAggregateOutputType | null
    _max: UserFriendshipMaxAggregateOutputType | null
  }

  export type UserFriendshipMinAggregateOutputType = {
    id: string | null
    requesterId: string | null
    receiverId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserFriendshipMaxAggregateOutputType = {
    id: string | null
    requesterId: string | null
    receiverId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserFriendshipCountAggregateOutputType = {
    id: number
    requesterId: number
    receiverId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserFriendshipMinAggregateInputType = {
    id?: true
    requesterId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserFriendshipMaxAggregateInputType = {
    id?: true
    requesterId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserFriendshipCountAggregateInputType = {
    id?: true
    requesterId?: true
    receiverId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserFriendshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFriendship to aggregate.
     */
    where?: UserFriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFriendships to fetch.
     */
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserFriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFriendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFriendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserFriendships
    **/
    _count?: true | UserFriendshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserFriendshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserFriendshipMaxAggregateInputType
  }

  export type GetUserFriendshipAggregateType<T extends UserFriendshipAggregateArgs> = {
        [P in keyof T & keyof AggregateUserFriendship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserFriendship[P]>
      : GetScalarType<T[P], AggregateUserFriendship[P]>
  }




  export type UserFriendshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFriendshipWhereInput
    orderBy?: UserFriendshipOrderByWithAggregationInput | UserFriendshipOrderByWithAggregationInput[]
    by: UserFriendshipScalarFieldEnum[] | UserFriendshipScalarFieldEnum
    having?: UserFriendshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserFriendshipCountAggregateInputType | true
    _min?: UserFriendshipMinAggregateInputType
    _max?: UserFriendshipMaxAggregateInputType
  }

  export type UserFriendshipGroupByOutputType = {
    id: string
    requesterId: string
    receiverId: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: UserFriendshipCountAggregateOutputType | null
    _min: UserFriendshipMinAggregateOutputType | null
    _max: UserFriendshipMaxAggregateOutputType | null
  }

  type GetUserFriendshipGroupByPayload<T extends UserFriendshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserFriendshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserFriendshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserFriendshipGroupByOutputType[P]>
            : GetScalarType<T[P], UserFriendshipGroupByOutputType[P]>
        }
      >
    >


  export type UserFriendshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFriendship"]>

  export type UserFriendshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFriendship"]>

  export type UserFriendshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFriendship"]>

  export type UserFriendshipSelectScalar = {
    id?: boolean
    requesterId?: boolean
    receiverId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserFriendshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requesterId" | "receiverId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["userFriendship"]>
  export type UserFriendshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserFriendshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserFriendshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserFriendshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserFriendship"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterId: string
      receiverId: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userFriendship"]>
    composites: {}
  }

  type UserFriendshipGetPayload<S extends boolean | null | undefined | UserFriendshipDefaultArgs> = $Result.GetResult<Prisma.$UserFriendshipPayload, S>

  type UserFriendshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFriendshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserFriendshipCountAggregateInputType | true
    }

  export interface UserFriendshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserFriendship'], meta: { name: 'UserFriendship' } }
    /**
     * Find zero or one UserFriendship that matches the filter.
     * @param {UserFriendshipFindUniqueArgs} args - Arguments to find a UserFriendship
     * @example
     * // Get one UserFriendship
     * const userFriendship = await prisma.userFriendship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFriendshipFindUniqueArgs>(args: SelectSubset<T, UserFriendshipFindUniqueArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserFriendship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFriendshipFindUniqueOrThrowArgs} args - Arguments to find a UserFriendship
     * @example
     * // Get one UserFriendship
     * const userFriendship = await prisma.userFriendship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFriendshipFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFriendshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFriendship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipFindFirstArgs} args - Arguments to find a UserFriendship
     * @example
     * // Get one UserFriendship
     * const userFriendship = await prisma.userFriendship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFriendshipFindFirstArgs>(args?: SelectSubset<T, UserFriendshipFindFirstArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFriendship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipFindFirstOrThrowArgs} args - Arguments to find a UserFriendship
     * @example
     * // Get one UserFriendship
     * const userFriendship = await prisma.userFriendship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFriendshipFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFriendshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserFriendships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserFriendships
     * const userFriendships = await prisma.userFriendship.findMany()
     * 
     * // Get first 10 UserFriendships
     * const userFriendships = await prisma.userFriendship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userFriendshipWithIdOnly = await prisma.userFriendship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFriendshipFindManyArgs>(args?: SelectSubset<T, UserFriendshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserFriendship.
     * @param {UserFriendshipCreateArgs} args - Arguments to create a UserFriendship.
     * @example
     * // Create one UserFriendship
     * const UserFriendship = await prisma.userFriendship.create({
     *   data: {
     *     // ... data to create a UserFriendship
     *   }
     * })
     * 
     */
    create<T extends UserFriendshipCreateArgs>(args: SelectSubset<T, UserFriendshipCreateArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserFriendships.
     * @param {UserFriendshipCreateManyArgs} args - Arguments to create many UserFriendships.
     * @example
     * // Create many UserFriendships
     * const userFriendship = await prisma.userFriendship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserFriendshipCreateManyArgs>(args?: SelectSubset<T, UserFriendshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserFriendships and returns the data saved in the database.
     * @param {UserFriendshipCreateManyAndReturnArgs} args - Arguments to create many UserFriendships.
     * @example
     * // Create many UserFriendships
     * const userFriendship = await prisma.userFriendship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserFriendships and only return the `id`
     * const userFriendshipWithIdOnly = await prisma.userFriendship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserFriendshipCreateManyAndReturnArgs>(args?: SelectSubset<T, UserFriendshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserFriendship.
     * @param {UserFriendshipDeleteArgs} args - Arguments to delete one UserFriendship.
     * @example
     * // Delete one UserFriendship
     * const UserFriendship = await prisma.userFriendship.delete({
     *   where: {
     *     // ... filter to delete one UserFriendship
     *   }
     * })
     * 
     */
    delete<T extends UserFriendshipDeleteArgs>(args: SelectSubset<T, UserFriendshipDeleteArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserFriendship.
     * @param {UserFriendshipUpdateArgs} args - Arguments to update one UserFriendship.
     * @example
     * // Update one UserFriendship
     * const userFriendship = await prisma.userFriendship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserFriendshipUpdateArgs>(args: SelectSubset<T, UserFriendshipUpdateArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserFriendships.
     * @param {UserFriendshipDeleteManyArgs} args - Arguments to filter UserFriendships to delete.
     * @example
     * // Delete a few UserFriendships
     * const { count } = await prisma.userFriendship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserFriendshipDeleteManyArgs>(args?: SelectSubset<T, UserFriendshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFriendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserFriendships
     * const userFriendship = await prisma.userFriendship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserFriendshipUpdateManyArgs>(args: SelectSubset<T, UserFriendshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFriendships and returns the data updated in the database.
     * @param {UserFriendshipUpdateManyAndReturnArgs} args - Arguments to update many UserFriendships.
     * @example
     * // Update many UserFriendships
     * const userFriendship = await prisma.userFriendship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserFriendships and only return the `id`
     * const userFriendshipWithIdOnly = await prisma.userFriendship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserFriendshipUpdateManyAndReturnArgs>(args: SelectSubset<T, UserFriendshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserFriendship.
     * @param {UserFriendshipUpsertArgs} args - Arguments to update or create a UserFriendship.
     * @example
     * // Update or create a UserFriendship
     * const userFriendship = await prisma.userFriendship.upsert({
     *   create: {
     *     // ... data to create a UserFriendship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserFriendship we want to update
     *   }
     * })
     */
    upsert<T extends UserFriendshipUpsertArgs>(args: SelectSubset<T, UserFriendshipUpsertArgs<ExtArgs>>): Prisma__UserFriendshipClient<$Result.GetResult<Prisma.$UserFriendshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserFriendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipCountArgs} args - Arguments to filter UserFriendships to count.
     * @example
     * // Count the number of UserFriendships
     * const count = await prisma.userFriendship.count({
     *   where: {
     *     // ... the filter for the UserFriendships we want to count
     *   }
     * })
    **/
    count<T extends UserFriendshipCountArgs>(
      args?: Subset<T, UserFriendshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserFriendshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserFriendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserFriendshipAggregateArgs>(args: Subset<T, UserFriendshipAggregateArgs>): Prisma.PrismaPromise<GetUserFriendshipAggregateType<T>>

    /**
     * Group by UserFriendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFriendshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserFriendshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserFriendshipGroupByArgs['orderBy'] }
        : { orderBy?: UserFriendshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserFriendshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserFriendshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserFriendship model
   */
  readonly fields: UserFriendshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserFriendship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserFriendshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserFriendship model
   */
  interface UserFriendshipFieldRefs {
    readonly id: FieldRef<"UserFriendship", 'String'>
    readonly requesterId: FieldRef<"UserFriendship", 'String'>
    readonly receiverId: FieldRef<"UserFriendship", 'String'>
    readonly status: FieldRef<"UserFriendship", 'String'>
    readonly createdAt: FieldRef<"UserFriendship", 'DateTime'>
    readonly updatedAt: FieldRef<"UserFriendship", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserFriendship findUnique
   */
  export type UserFriendshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter, which UserFriendship to fetch.
     */
    where: UserFriendshipWhereUniqueInput
  }

  /**
   * UserFriendship findUniqueOrThrow
   */
  export type UserFriendshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter, which UserFriendship to fetch.
     */
    where: UserFriendshipWhereUniqueInput
  }

  /**
   * UserFriendship findFirst
   */
  export type UserFriendshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter, which UserFriendship to fetch.
     */
    where?: UserFriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFriendships to fetch.
     */
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFriendships.
     */
    cursor?: UserFriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFriendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFriendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFriendships.
     */
    distinct?: UserFriendshipScalarFieldEnum | UserFriendshipScalarFieldEnum[]
  }

  /**
   * UserFriendship findFirstOrThrow
   */
  export type UserFriendshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter, which UserFriendship to fetch.
     */
    where?: UserFriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFriendships to fetch.
     */
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFriendships.
     */
    cursor?: UserFriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFriendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFriendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFriendships.
     */
    distinct?: UserFriendshipScalarFieldEnum | UserFriendshipScalarFieldEnum[]
  }

  /**
   * UserFriendship findMany
   */
  export type UserFriendshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter, which UserFriendships to fetch.
     */
    where?: UserFriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFriendships to fetch.
     */
    orderBy?: UserFriendshipOrderByWithRelationInput | UserFriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserFriendships.
     */
    cursor?: UserFriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFriendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFriendships.
     */
    skip?: number
    distinct?: UserFriendshipScalarFieldEnum | UserFriendshipScalarFieldEnum[]
  }

  /**
   * UserFriendship create
   */
  export type UserFriendshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * The data needed to create a UserFriendship.
     */
    data: XOR<UserFriendshipCreateInput, UserFriendshipUncheckedCreateInput>
  }

  /**
   * UserFriendship createMany
   */
  export type UserFriendshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserFriendships.
     */
    data: UserFriendshipCreateManyInput | UserFriendshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserFriendship createManyAndReturn
   */
  export type UserFriendshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * The data used to create many UserFriendships.
     */
    data: UserFriendshipCreateManyInput | UserFriendshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFriendship update
   */
  export type UserFriendshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * The data needed to update a UserFriendship.
     */
    data: XOR<UserFriendshipUpdateInput, UserFriendshipUncheckedUpdateInput>
    /**
     * Choose, which UserFriendship to update.
     */
    where: UserFriendshipWhereUniqueInput
  }

  /**
   * UserFriendship updateMany
   */
  export type UserFriendshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserFriendships.
     */
    data: XOR<UserFriendshipUpdateManyMutationInput, UserFriendshipUncheckedUpdateManyInput>
    /**
     * Filter which UserFriendships to update
     */
    where?: UserFriendshipWhereInput
    /**
     * Limit how many UserFriendships to update.
     */
    limit?: number
  }

  /**
   * UserFriendship updateManyAndReturn
   */
  export type UserFriendshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * The data used to update UserFriendships.
     */
    data: XOR<UserFriendshipUpdateManyMutationInput, UserFriendshipUncheckedUpdateManyInput>
    /**
     * Filter which UserFriendships to update
     */
    where?: UserFriendshipWhereInput
    /**
     * Limit how many UserFriendships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFriendship upsert
   */
  export type UserFriendshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * The filter to search for the UserFriendship to update in case it exists.
     */
    where: UserFriendshipWhereUniqueInput
    /**
     * In case the UserFriendship found by the `where` argument doesn't exist, create a new UserFriendship with this data.
     */
    create: XOR<UserFriendshipCreateInput, UserFriendshipUncheckedCreateInput>
    /**
     * In case the UserFriendship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserFriendshipUpdateInput, UserFriendshipUncheckedUpdateInput>
  }

  /**
   * UserFriendship delete
   */
  export type UserFriendshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
    /**
     * Filter which UserFriendship to delete.
     */
    where: UserFriendshipWhereUniqueInput
  }

  /**
   * UserFriendship deleteMany
   */
  export type UserFriendshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFriendships to delete
     */
    where?: UserFriendshipWhereInput
    /**
     * Limit how many UserFriendships to delete.
     */
    limit?: number
  }

  /**
   * UserFriendship without action
   */
  export type UserFriendshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFriendship
     */
    select?: UserFriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFriendship
     */
    omit?: UserFriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFriendshipInclude<ExtArgs> | null
  }


  /**
   * Model UserStats
   */

  export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  export type UserStatsAvgAggregateOutputType = {
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    highestScore: number | null
    generalaServed: number | null
    straights: number | null
    fullHouses: number | null
    pokers: number | null
    generalas: number | null
    averageScore: number | null
    winRate: number | null
    totalTimePlayed: number | null
    elo: number | null
    eloChange: number | null
  }

  export type UserStatsSumAggregateOutputType = {
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    highestScore: number | null
    generalaServed: number | null
    straights: number | null
    fullHouses: number | null
    pokers: number | null
    generalas: number | null
    averageScore: number | null
    winRate: number | null
    totalTimePlayed: number | null
    elo: number | null
    eloChange: number | null
  }

  export type UserStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    highestScore: number | null
    generalaServed: number | null
    straights: number | null
    fullHouses: number | null
    pokers: number | null
    generalas: number | null
    averageScore: number | null
    winRate: number | null
    totalTimePlayed: number | null
    lastGameDate: Date | null
    elo: number | null
    eloChange: number | null
  }

  export type UserStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    gamesPlayed: number | null
    gamesWon: number | null
    gamesLost: number | null
    highestScore: number | null
    generalaServed: number | null
    straights: number | null
    fullHouses: number | null
    pokers: number | null
    generalas: number | null
    averageScore: number | null
    winRate: number | null
    totalTimePlayed: number | null
    lastGameDate: Date | null
    elo: number | null
    eloChange: number | null
  }

  export type UserStatsCountAggregateOutputType = {
    id: number
    userId: number
    gamesPlayed: number
    gamesWon: number
    gamesLost: number
    highestScore: number
    generalaServed: number
    straights: number
    fullHouses: number
    pokers: number
    generalas: number
    averageScore: number
    winRate: number
    totalTimePlayed: number
    lastGameDate: number
    elo: number
    eloChange: number
    _all: number
  }


  export type UserStatsAvgAggregateInputType = {
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    highestScore?: true
    generalaServed?: true
    straights?: true
    fullHouses?: true
    pokers?: true
    generalas?: true
    averageScore?: true
    winRate?: true
    totalTimePlayed?: true
    elo?: true
    eloChange?: true
  }

  export type UserStatsSumAggregateInputType = {
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    highestScore?: true
    generalaServed?: true
    straights?: true
    fullHouses?: true
    pokers?: true
    generalas?: true
    averageScore?: true
    winRate?: true
    totalTimePlayed?: true
    elo?: true
    eloChange?: true
  }

  export type UserStatsMinAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    highestScore?: true
    generalaServed?: true
    straights?: true
    fullHouses?: true
    pokers?: true
    generalas?: true
    averageScore?: true
    winRate?: true
    totalTimePlayed?: true
    lastGameDate?: true
    elo?: true
    eloChange?: true
  }

  export type UserStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    highestScore?: true
    generalaServed?: true
    straights?: true
    fullHouses?: true
    pokers?: true
    generalas?: true
    averageScore?: true
    winRate?: true
    totalTimePlayed?: true
    lastGameDate?: true
    elo?: true
    eloChange?: true
  }

  export type UserStatsCountAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    gamesWon?: true
    gamesLost?: true
    highestScore?: true
    generalaServed?: true
    straights?: true
    fullHouses?: true
    pokers?: true
    generalas?: true
    averageScore?: true
    winRate?: true
    totalTimePlayed?: true
    lastGameDate?: true
    elo?: true
    eloChange?: true
    _all?: true
  }

  export type UserStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to aggregate.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStats
    **/
    _count?: true | UserStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStatsMaxAggregateInputType
  }

  export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStats[P]>
      : GetScalarType<T[P], AggregateUserStats[P]>
  }




  export type UserStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStatsWhereInput
    orderBy?: UserStatsOrderByWithAggregationInput | UserStatsOrderByWithAggregationInput[]
    by: UserStatsScalarFieldEnum[] | UserStatsScalarFieldEnum
    having?: UserStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStatsCountAggregateInputType | true
    _avg?: UserStatsAvgAggregateInputType
    _sum?: UserStatsSumAggregateInputType
    _min?: UserStatsMinAggregateInputType
    _max?: UserStatsMaxAggregateInputType
  }

  export type UserStatsGroupByOutputType = {
    id: string
    userId: string
    gamesPlayed: number
    gamesWon: number
    gamesLost: number
    highestScore: number
    generalaServed: number
    straights: number
    fullHouses: number
    pokers: number
    generalas: number
    averageScore: number
    winRate: number
    totalTimePlayed: number
    lastGameDate: Date | null
    elo: number
    eloChange: number
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    highestScore?: boolean
    generalaServed?: boolean
    straights?: boolean
    fullHouses?: boolean
    pokers?: boolean
    generalas?: boolean
    averageScore?: boolean
    winRate?: boolean
    totalTimePlayed?: boolean
    lastGameDate?: boolean
    elo?: boolean
    eloChange?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    highestScore?: boolean
    generalaServed?: boolean
    straights?: boolean
    fullHouses?: boolean
    pokers?: boolean
    generalas?: boolean
    averageScore?: boolean
    winRate?: boolean
    totalTimePlayed?: boolean
    lastGameDate?: boolean
    elo?: boolean
    eloChange?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    highestScore?: boolean
    generalaServed?: boolean
    straights?: boolean
    fullHouses?: boolean
    pokers?: boolean
    generalas?: boolean
    averageScore?: boolean
    winRate?: boolean
    totalTimePlayed?: boolean
    lastGameDate?: boolean
    elo?: boolean
    eloChange?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    gamesWon?: boolean
    gamesLost?: boolean
    highestScore?: boolean
    generalaServed?: boolean
    straights?: boolean
    fullHouses?: boolean
    pokers?: boolean
    generalas?: boolean
    averageScore?: boolean
    winRate?: boolean
    totalTimePlayed?: boolean
    lastGameDate?: boolean
    elo?: boolean
    eloChange?: boolean
  }

  export type UserStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gamesPlayed" | "gamesWon" | "gamesLost" | "highestScore" | "generalaServed" | "straights" | "fullHouses" | "pokers" | "generalas" | "averageScore" | "winRate" | "totalTimePlayed" | "lastGameDate" | "elo" | "eloChange", ExtArgs["result"]["userStats"]>
  export type UserStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      gamesPlayed: number
      gamesWon: number
      gamesLost: number
      highestScore: number
      generalaServed: number
      straights: number
      fullHouses: number
      pokers: number
      generalas: number
      averageScore: number
      winRate: number
      totalTimePlayed: number
      lastGameDate: Date | null
      elo: number
      eloChange: number
    }, ExtArgs["result"]["userStats"]>
    composites: {}
  }

  type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = $Result.GetResult<Prisma.$UserStatsPayload, S>

  type UserStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserStatsCountAggregateInputType | true
    }

  export interface UserStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStats'], meta: { name: 'UserStats' } }
    /**
     * Find zero or one UserStats that matches the filter.
     * @param {UserStatsFindUniqueArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStatsFindUniqueArgs>(args: SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserStatsFindUniqueOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStatsFindFirstArgs>(args?: SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStats
     * const userStats = await prisma.userStats.findMany()
     * 
     * // Get first 10 UserStats
     * const userStats = await prisma.userStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStatsWithIdOnly = await prisma.userStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStatsFindManyArgs>(args?: SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserStats.
     * @param {UserStatsCreateArgs} args - Arguments to create a UserStats.
     * @example
     * // Create one UserStats
     * const UserStats = await prisma.userStats.create({
     *   data: {
     *     // ... data to create a UserStats
     *   }
     * })
     * 
     */
    create<T extends UserStatsCreateArgs>(args: SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserStats.
     * @param {UserStatsCreateManyArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStatsCreateManyArgs>(args?: SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStats and returns the data saved in the database.
     * @param {UserStatsCreateManyAndReturnArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserStats.
     * @param {UserStatsDeleteArgs} args - Arguments to delete one UserStats.
     * @example
     * // Delete one UserStats
     * const UserStats = await prisma.userStats.delete({
     *   where: {
     *     // ... filter to delete one UserStats
     *   }
     * })
     * 
     */
    delete<T extends UserStatsDeleteArgs>(args: SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserStats.
     * @param {UserStatsUpdateArgs} args - Arguments to update one UserStats.
     * @example
     * // Update one UserStats
     * const userStats = await prisma.userStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStatsUpdateArgs>(args: SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserStats.
     * @param {UserStatsDeleteManyArgs} args - Arguments to filter UserStats to delete.
     * @example
     * // Delete a few UserStats
     * const { count } = await prisma.userStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStatsUpdateManyArgs>(args: SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats and returns the data updated in the database.
     * @param {UserStatsUpdateManyAndReturnArgs} args - Arguments to update many UserStats.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserStats.
     * @param {UserStatsUpsertArgs} args - Arguments to update or create a UserStats.
     * @example
     * // Update or create a UserStats
     * const userStats = await prisma.userStats.upsert({
     *   create: {
     *     // ... data to create a UserStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStats we want to update
     *   }
     * })
     */
    upsert<T extends UserStatsUpsertArgs>(args: SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsCountArgs} args - Arguments to filter UserStats to count.
     * @example
     * // Count the number of UserStats
     * const count = await prisma.userStats.count({
     *   where: {
     *     // ... the filter for the UserStats we want to count
     *   }
     * })
    **/
    count<T extends UserStatsCountArgs>(
      args?: Subset<T, UserStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStatsAggregateArgs>(args: Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>

    /**
     * Group by UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStats model
   */
  readonly fields: UserStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStats model
   */
  interface UserStatsFieldRefs {
    readonly id: FieldRef<"UserStats", 'String'>
    readonly userId: FieldRef<"UserStats", 'String'>
    readonly gamesPlayed: FieldRef<"UserStats", 'Int'>
    readonly gamesWon: FieldRef<"UserStats", 'Int'>
    readonly gamesLost: FieldRef<"UserStats", 'Int'>
    readonly highestScore: FieldRef<"UserStats", 'Int'>
    readonly generalaServed: FieldRef<"UserStats", 'Int'>
    readonly straights: FieldRef<"UserStats", 'Int'>
    readonly fullHouses: FieldRef<"UserStats", 'Int'>
    readonly pokers: FieldRef<"UserStats", 'Int'>
    readonly generalas: FieldRef<"UserStats", 'Int'>
    readonly averageScore: FieldRef<"UserStats", 'Float'>
    readonly winRate: FieldRef<"UserStats", 'Float'>
    readonly totalTimePlayed: FieldRef<"UserStats", 'Int'>
    readonly lastGameDate: FieldRef<"UserStats", 'DateTime'>
    readonly elo: FieldRef<"UserStats", 'Int'>
    readonly eloChange: FieldRef<"UserStats", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserStats findUnique
   */
  export type UserStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findUniqueOrThrow
   */
  export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findFirst
   */
  export type UserStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findFirstOrThrow
   */
  export type UserStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findMany
   */
  export type UserStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats create
   */
  export type UserStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStats.
     */
    data: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
  }

  /**
   * UserStats createMany
   */
  export type UserStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats createManyAndReturn
   */
  export type UserStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats update
   */
  export type UserStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStats.
     */
    data: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
    /**
     * Choose, which UserStats to update.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats updateMany
   */
  export type UserStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
  }

  /**
   * UserStats updateManyAndReturn
   */
  export type UserStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats upsert
   */
  export type UserStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStats to update in case it exists.
     */
    where: UserStatsWhereUniqueInput
    /**
     * In case the UserStats found by the `where` argument doesn't exist, create a new UserStats with this data.
     */
    create: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
    /**
     * In case the UserStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
  }

  /**
   * UserStats delete
   */
  export type UserStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter which UserStats to delete.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats deleteMany
   */
  export type UserStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to delete
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to delete.
     */
    limit?: number
  }

  /**
   * UserStats without action
   */
  export type UserStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    maxPlayers: number | null
    minPlayers: number | null
    turnTimeout: number | null
    diceValues: number | null
    rollCount: number | null
  }

  export type GameSumAggregateOutputType = {
    maxPlayers: number | null
    minPlayers: number | null
    turnTimeout: number | null
    diceValues: number[]
    rollCount: number | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    status: string | null
    name: string | null
    winnerId: string | null
    maxPlayers: number | null
    minPlayers: number | null
    turnTimeout: number | null
    password: string | null
    ownerId: string | null
    currentTurnId: string | null
    rollCount: number | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    status: string | null
    name: string | null
    winnerId: string | null
    maxPlayers: number | null
    minPlayers: number | null
    turnTimeout: number | null
    password: string | null
    ownerId: string | null
    currentTurnId: string | null
    rollCount: number | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    createdAt: number
    status: number
    name: number
    winnerId: number
    maxPlayers: number
    minPlayers: number
    turnTimeout: number
    password: number
    ownerId: number
    currentTurnId: number
    diceValues: number
    rollCount: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    maxPlayers?: true
    minPlayers?: true
    turnTimeout?: true
    diceValues?: true
    rollCount?: true
  }

  export type GameSumAggregateInputType = {
    maxPlayers?: true
    minPlayers?: true
    turnTimeout?: true
    diceValues?: true
    rollCount?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
    name?: true
    winnerId?: true
    maxPlayers?: true
    minPlayers?: true
    turnTimeout?: true
    password?: true
    ownerId?: true
    currentTurnId?: true
    rollCount?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
    name?: true
    winnerId?: true
    maxPlayers?: true
    minPlayers?: true
    turnTimeout?: true
    password?: true
    ownerId?: true
    currentTurnId?: true
    rollCount?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    createdAt?: true
    status?: true
    name?: true
    winnerId?: true
    maxPlayers?: true
    minPlayers?: true
    turnTimeout?: true
    password?: true
    ownerId?: true
    currentTurnId?: true
    diceValues?: true
    rollCount?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    createdAt: Date
    status: string
    name: string
    winnerId: string | null
    maxPlayers: number
    minPlayers: number
    turnTimeout: number | null
    password: string | null
    ownerId: string
    currentTurnId: string | null
    diceValues: number[]
    rollCount: number
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
    name?: boolean
    winnerId?: boolean
    maxPlayers?: boolean
    minPlayers?: boolean
    turnTimeout?: boolean
    password?: boolean
    ownerId?: boolean
    currentTurnId?: boolean
    diceValues?: boolean
    rollCount?: boolean
    players?: boolean | Game$playersArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    invitations?: boolean | Game$invitationsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
    name?: boolean
    winnerId?: boolean
    maxPlayers?: boolean
    minPlayers?: boolean
    turnTimeout?: boolean
    password?: boolean
    ownerId?: boolean
    currentTurnId?: boolean
    diceValues?: boolean
    rollCount?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    status?: boolean
    name?: boolean
    winnerId?: boolean
    maxPlayers?: boolean
    minPlayers?: boolean
    turnTimeout?: boolean
    password?: boolean
    ownerId?: boolean
    currentTurnId?: boolean
    diceValues?: boolean
    rollCount?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    createdAt?: boolean
    status?: boolean
    name?: boolean
    winnerId?: boolean
    maxPlayers?: boolean
    minPlayers?: boolean
    turnTimeout?: boolean
    password?: boolean
    ownerId?: boolean
    currentTurnId?: boolean
    diceValues?: boolean
    rollCount?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "status" | "name" | "winnerId" | "maxPlayers" | "minPlayers" | "turnTimeout" | "password" | "ownerId" | "currentTurnId" | "diceValues" | "rollCount", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Game$playersArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    invitations?: boolean | Game$invitationsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      players: Prisma.$GameUserPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs>
      invitations: Prisma.$GameInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      status: string
      name: string
      winnerId: string | null
      maxPlayers: number
      minPlayers: number
      turnTimeout: number | null
      password: string | null
      ownerId: string
      currentTurnId: string | null
      diceValues: number[]
      rollCount: number
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends Game$playersArgs<ExtArgs> = {}>(args?: Subset<T, Game$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitations<T extends Game$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Game$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly status: FieldRef<"Game", 'String'>
    readonly name: FieldRef<"Game", 'String'>
    readonly winnerId: FieldRef<"Game", 'String'>
    readonly maxPlayers: FieldRef<"Game", 'Int'>
    readonly minPlayers: FieldRef<"Game", 'Int'>
    readonly turnTimeout: FieldRef<"Game", 'Int'>
    readonly password: FieldRef<"Game", 'String'>
    readonly ownerId: FieldRef<"Game", 'String'>
    readonly currentTurnId: FieldRef<"Game", 'String'>
    readonly diceValues: FieldRef<"Game", 'Int[]'>
    readonly rollCount: FieldRef<"Game", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.players
   */
  export type Game$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    where?: GameUserWhereInput
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    cursor?: GameUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameUserScalarFieldEnum | GameUserScalarFieldEnum[]
  }

  /**
   * Game.invitations
   */
  export type Game$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    where?: GameInvitationWhereInput
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    cursor?: GameInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model GameUser
   */

  export type AggregateGameUser = {
    _count: GameUserCountAggregateOutputType | null
    _avg: GameUserAvgAggregateOutputType | null
    _sum: GameUserSumAggregateOutputType | null
    _min: GameUserMinAggregateOutputType | null
    _max: GameUserMaxAggregateOutputType | null
  }

  export type GameUserAvgAggregateOutputType = {
    ones: number | null
    twos: number | null
    threes: number | null
    fours: number | null
    fives: number | null
    sixes: number | null
    straight: number | null
    fullHouse: number | null
    poker: number | null
    generala: number | null
    double: number | null
    totalScore: number | null
  }

  export type GameUserSumAggregateOutputType = {
    ones: number | null
    twos: number | null
    threes: number | null
    fours: number | null
    fives: number | null
    sixes: number | null
    straight: number | null
    fullHouse: number | null
    poker: number | null
    generala: number | null
    double: number | null
    totalScore: number | null
  }

  export type GameUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    gameId: string | null
    ones: number | null
    twos: number | null
    threes: number | null
    fours: number | null
    fives: number | null
    sixes: number | null
    straight: number | null
    fullHouse: number | null
    poker: number | null
    generala: number | null
    double: number | null
    totalScore: number | null
  }

  export type GameUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    gameId: string | null
    ones: number | null
    twos: number | null
    threes: number | null
    fours: number | null
    fives: number | null
    sixes: number | null
    straight: number | null
    fullHouse: number | null
    poker: number | null
    generala: number | null
    double: number | null
    totalScore: number | null
  }

  export type GameUserCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    ones: number
    twos: number
    threes: number
    fours: number
    fives: number
    sixes: number
    straight: number
    fullHouse: number
    poker: number
    generala: number
    double: number
    totalScore: number
    _all: number
  }


  export type GameUserAvgAggregateInputType = {
    ones?: true
    twos?: true
    threes?: true
    fours?: true
    fives?: true
    sixes?: true
    straight?: true
    fullHouse?: true
    poker?: true
    generala?: true
    double?: true
    totalScore?: true
  }

  export type GameUserSumAggregateInputType = {
    ones?: true
    twos?: true
    threes?: true
    fours?: true
    fives?: true
    sixes?: true
    straight?: true
    fullHouse?: true
    poker?: true
    generala?: true
    double?: true
    totalScore?: true
  }

  export type GameUserMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    ones?: true
    twos?: true
    threes?: true
    fours?: true
    fives?: true
    sixes?: true
    straight?: true
    fullHouse?: true
    poker?: true
    generala?: true
    double?: true
    totalScore?: true
  }

  export type GameUserMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    ones?: true
    twos?: true
    threes?: true
    fours?: true
    fives?: true
    sixes?: true
    straight?: true
    fullHouse?: true
    poker?: true
    generala?: true
    double?: true
    totalScore?: true
  }

  export type GameUserCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    ones?: true
    twos?: true
    threes?: true
    fours?: true
    fives?: true
    sixes?: true
    straight?: true
    fullHouse?: true
    poker?: true
    generala?: true
    double?: true
    totalScore?: true
    _all?: true
  }

  export type GameUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameUser to aggregate.
     */
    where?: GameUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameUsers to fetch.
     */
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameUsers
    **/
    _count?: true | GameUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameUserMaxAggregateInputType
  }

  export type GetGameUserAggregateType<T extends GameUserAggregateArgs> = {
        [P in keyof T & keyof AggregateGameUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameUser[P]>
      : GetScalarType<T[P], AggregateGameUser[P]>
  }




  export type GameUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameUserWhereInput
    orderBy?: GameUserOrderByWithAggregationInput | GameUserOrderByWithAggregationInput[]
    by: GameUserScalarFieldEnum[] | GameUserScalarFieldEnum
    having?: GameUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameUserCountAggregateInputType | true
    _avg?: GameUserAvgAggregateInputType
    _sum?: GameUserSumAggregateInputType
    _min?: GameUserMinAggregateInputType
    _max?: GameUserMaxAggregateInputType
  }

  export type GameUserGroupByOutputType = {
    id: string
    userId: string
    gameId: string
    ones: number | null
    twos: number | null
    threes: number | null
    fours: number | null
    fives: number | null
    sixes: number | null
    straight: number | null
    fullHouse: number | null
    poker: number | null
    generala: number | null
    double: number | null
    totalScore: number | null
    _count: GameUserCountAggregateOutputType | null
    _avg: GameUserAvgAggregateOutputType | null
    _sum: GameUserSumAggregateOutputType | null
    _min: GameUserMinAggregateOutputType | null
    _max: GameUserMaxAggregateOutputType | null
  }

  type GetGameUserGroupByPayload<T extends GameUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameUserGroupByOutputType[P]>
            : GetScalarType<T[P], GameUserGroupByOutputType[P]>
        }
      >
    >


  export type GameUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    ones?: boolean
    twos?: boolean
    threes?: boolean
    fours?: boolean
    fives?: boolean
    sixes?: boolean
    straight?: boolean
    fullHouse?: boolean
    poker?: boolean
    generala?: boolean
    double?: boolean
    totalScore?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameUser"]>

  export type GameUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    ones?: boolean
    twos?: boolean
    threes?: boolean
    fours?: boolean
    fives?: boolean
    sixes?: boolean
    straight?: boolean
    fullHouse?: boolean
    poker?: boolean
    generala?: boolean
    double?: boolean
    totalScore?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameUser"]>

  export type GameUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    ones?: boolean
    twos?: boolean
    threes?: boolean
    fours?: boolean
    fives?: boolean
    sixes?: boolean
    straight?: boolean
    fullHouse?: boolean
    poker?: boolean
    generala?: boolean
    double?: boolean
    totalScore?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameUser"]>

  export type GameUserSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    ones?: boolean
    twos?: boolean
    threes?: boolean
    fours?: boolean
    fives?: boolean
    sixes?: boolean
    straight?: boolean
    fullHouse?: boolean
    poker?: boolean
    generala?: boolean
    double?: boolean
    totalScore?: boolean
  }

  export type GameUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "gameId" | "ones" | "twos" | "threes" | "fours" | "fives" | "sixes" | "straight" | "fullHouse" | "poker" | "generala" | "double" | "totalScore", ExtArgs["result"]["gameUser"]>
  export type GameUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GameUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GameUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $GameUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      game: Prisma.$GamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      gameId: string
      ones: number | null
      twos: number | null
      threes: number | null
      fours: number | null
      fives: number | null
      sixes: number | null
      straight: number | null
      fullHouse: number | null
      poker: number | null
      generala: number | null
      double: number | null
      totalScore: number | null
    }, ExtArgs["result"]["gameUser"]>
    composites: {}
  }

  type GameUserGetPayload<S extends boolean | null | undefined | GameUserDefaultArgs> = $Result.GetResult<Prisma.$GameUserPayload, S>

  type GameUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameUserCountAggregateInputType | true
    }

  export interface GameUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameUser'], meta: { name: 'GameUser' } }
    /**
     * Find zero or one GameUser that matches the filter.
     * @param {GameUserFindUniqueArgs} args - Arguments to find a GameUser
     * @example
     * // Get one GameUser
     * const gameUser = await prisma.gameUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameUserFindUniqueArgs>(args: SelectSubset<T, GameUserFindUniqueArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameUserFindUniqueOrThrowArgs} args - Arguments to find a GameUser
     * @example
     * // Get one GameUser
     * const gameUser = await prisma.gameUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameUserFindUniqueOrThrowArgs>(args: SelectSubset<T, GameUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserFindFirstArgs} args - Arguments to find a GameUser
     * @example
     * // Get one GameUser
     * const gameUser = await prisma.gameUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameUserFindFirstArgs>(args?: SelectSubset<T, GameUserFindFirstArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserFindFirstOrThrowArgs} args - Arguments to find a GameUser
     * @example
     * // Get one GameUser
     * const gameUser = await prisma.gameUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameUserFindFirstOrThrowArgs>(args?: SelectSubset<T, GameUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameUsers
     * const gameUsers = await prisma.gameUser.findMany()
     * 
     * // Get first 10 GameUsers
     * const gameUsers = await prisma.gameUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameUserWithIdOnly = await prisma.gameUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameUserFindManyArgs>(args?: SelectSubset<T, GameUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameUser.
     * @param {GameUserCreateArgs} args - Arguments to create a GameUser.
     * @example
     * // Create one GameUser
     * const GameUser = await prisma.gameUser.create({
     *   data: {
     *     // ... data to create a GameUser
     *   }
     * })
     * 
     */
    create<T extends GameUserCreateArgs>(args: SelectSubset<T, GameUserCreateArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameUsers.
     * @param {GameUserCreateManyArgs} args - Arguments to create many GameUsers.
     * @example
     * // Create many GameUsers
     * const gameUser = await prisma.gameUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameUserCreateManyArgs>(args?: SelectSubset<T, GameUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameUsers and returns the data saved in the database.
     * @param {GameUserCreateManyAndReturnArgs} args - Arguments to create many GameUsers.
     * @example
     * // Create many GameUsers
     * const gameUser = await prisma.gameUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameUsers and only return the `id`
     * const gameUserWithIdOnly = await prisma.gameUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameUserCreateManyAndReturnArgs>(args?: SelectSubset<T, GameUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameUser.
     * @param {GameUserDeleteArgs} args - Arguments to delete one GameUser.
     * @example
     * // Delete one GameUser
     * const GameUser = await prisma.gameUser.delete({
     *   where: {
     *     // ... filter to delete one GameUser
     *   }
     * })
     * 
     */
    delete<T extends GameUserDeleteArgs>(args: SelectSubset<T, GameUserDeleteArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameUser.
     * @param {GameUserUpdateArgs} args - Arguments to update one GameUser.
     * @example
     * // Update one GameUser
     * const gameUser = await prisma.gameUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUserUpdateArgs>(args: SelectSubset<T, GameUserUpdateArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameUsers.
     * @param {GameUserDeleteManyArgs} args - Arguments to filter GameUsers to delete.
     * @example
     * // Delete a few GameUsers
     * const { count } = await prisma.gameUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameUserDeleteManyArgs>(args?: SelectSubset<T, GameUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameUsers
     * const gameUser = await prisma.gameUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUserUpdateManyArgs>(args: SelectSubset<T, GameUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameUsers and returns the data updated in the database.
     * @param {GameUserUpdateManyAndReturnArgs} args - Arguments to update many GameUsers.
     * @example
     * // Update many GameUsers
     * const gameUser = await prisma.gameUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameUsers and only return the `id`
     * const gameUserWithIdOnly = await prisma.gameUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUserUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameUser.
     * @param {GameUserUpsertArgs} args - Arguments to update or create a GameUser.
     * @example
     * // Update or create a GameUser
     * const gameUser = await prisma.gameUser.upsert({
     *   create: {
     *     // ... data to create a GameUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameUser we want to update
     *   }
     * })
     */
    upsert<T extends GameUserUpsertArgs>(args: SelectSubset<T, GameUserUpsertArgs<ExtArgs>>): Prisma__GameUserClient<$Result.GetResult<Prisma.$GameUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserCountArgs} args - Arguments to filter GameUsers to count.
     * @example
     * // Count the number of GameUsers
     * const count = await prisma.gameUser.count({
     *   where: {
     *     // ... the filter for the GameUsers we want to count
     *   }
     * })
    **/
    count<T extends GameUserCountArgs>(
      args?: Subset<T, GameUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameUserAggregateArgs>(args: Subset<T, GameUserAggregateArgs>): Prisma.PrismaPromise<GetGameUserAggregateType<T>>

    /**
     * Group by GameUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameUserGroupByArgs['orderBy'] }
        : { orderBy?: GameUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameUser model
   */
  readonly fields: GameUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameUser model
   */
  interface GameUserFieldRefs {
    readonly id: FieldRef<"GameUser", 'String'>
    readonly userId: FieldRef<"GameUser", 'String'>
    readonly gameId: FieldRef<"GameUser", 'String'>
    readonly ones: FieldRef<"GameUser", 'Int'>
    readonly twos: FieldRef<"GameUser", 'Int'>
    readonly threes: FieldRef<"GameUser", 'Int'>
    readonly fours: FieldRef<"GameUser", 'Int'>
    readonly fives: FieldRef<"GameUser", 'Int'>
    readonly sixes: FieldRef<"GameUser", 'Int'>
    readonly straight: FieldRef<"GameUser", 'Int'>
    readonly fullHouse: FieldRef<"GameUser", 'Int'>
    readonly poker: FieldRef<"GameUser", 'Int'>
    readonly generala: FieldRef<"GameUser", 'Int'>
    readonly double: FieldRef<"GameUser", 'Int'>
    readonly totalScore: FieldRef<"GameUser", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GameUser findUnique
   */
  export type GameUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter, which GameUser to fetch.
     */
    where: GameUserWhereUniqueInput
  }

  /**
   * GameUser findUniqueOrThrow
   */
  export type GameUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter, which GameUser to fetch.
     */
    where: GameUserWhereUniqueInput
  }

  /**
   * GameUser findFirst
   */
  export type GameUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter, which GameUser to fetch.
     */
    where?: GameUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameUsers to fetch.
     */
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameUsers.
     */
    cursor?: GameUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameUsers.
     */
    distinct?: GameUserScalarFieldEnum | GameUserScalarFieldEnum[]
  }

  /**
   * GameUser findFirstOrThrow
   */
  export type GameUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter, which GameUser to fetch.
     */
    where?: GameUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameUsers to fetch.
     */
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameUsers.
     */
    cursor?: GameUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameUsers.
     */
    distinct?: GameUserScalarFieldEnum | GameUserScalarFieldEnum[]
  }

  /**
   * GameUser findMany
   */
  export type GameUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter, which GameUsers to fetch.
     */
    where?: GameUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameUsers to fetch.
     */
    orderBy?: GameUserOrderByWithRelationInput | GameUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameUsers.
     */
    cursor?: GameUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameUsers.
     */
    skip?: number
    distinct?: GameUserScalarFieldEnum | GameUserScalarFieldEnum[]
  }

  /**
   * GameUser create
   */
  export type GameUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * The data needed to create a GameUser.
     */
    data: XOR<GameUserCreateInput, GameUserUncheckedCreateInput>
  }

  /**
   * GameUser createMany
   */
  export type GameUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameUsers.
     */
    data: GameUserCreateManyInput | GameUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameUser createManyAndReturn
   */
  export type GameUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * The data used to create many GameUsers.
     */
    data: GameUserCreateManyInput | GameUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameUser update
   */
  export type GameUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * The data needed to update a GameUser.
     */
    data: XOR<GameUserUpdateInput, GameUserUncheckedUpdateInput>
    /**
     * Choose, which GameUser to update.
     */
    where: GameUserWhereUniqueInput
  }

  /**
   * GameUser updateMany
   */
  export type GameUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameUsers.
     */
    data: XOR<GameUserUpdateManyMutationInput, GameUserUncheckedUpdateManyInput>
    /**
     * Filter which GameUsers to update
     */
    where?: GameUserWhereInput
    /**
     * Limit how many GameUsers to update.
     */
    limit?: number
  }

  /**
   * GameUser updateManyAndReturn
   */
  export type GameUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * The data used to update GameUsers.
     */
    data: XOR<GameUserUpdateManyMutationInput, GameUserUncheckedUpdateManyInput>
    /**
     * Filter which GameUsers to update
     */
    where?: GameUserWhereInput
    /**
     * Limit how many GameUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameUser upsert
   */
  export type GameUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * The filter to search for the GameUser to update in case it exists.
     */
    where: GameUserWhereUniqueInput
    /**
     * In case the GameUser found by the `where` argument doesn't exist, create a new GameUser with this data.
     */
    create: XOR<GameUserCreateInput, GameUserUncheckedCreateInput>
    /**
     * In case the GameUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUserUpdateInput, GameUserUncheckedUpdateInput>
  }

  /**
   * GameUser delete
   */
  export type GameUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
    /**
     * Filter which GameUser to delete.
     */
    where: GameUserWhereUniqueInput
  }

  /**
   * GameUser deleteMany
   */
  export type GameUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameUsers to delete
     */
    where?: GameUserWhereInput
    /**
     * Limit how many GameUsers to delete.
     */
    limit?: number
  }

  /**
   * GameUser without action
   */
  export type GameUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameUser
     */
    select?: GameUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameUser
     */
    omit?: GameUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameUserInclude<ExtArgs> | null
  }


  /**
   * Model GameInvitation
   */

  export type AggregateGameInvitation = {
    _count: GameInvitationCountAggregateOutputType | null
    _min: GameInvitationMinAggregateOutputType | null
    _max: GameInvitationMaxAggregateOutputType | null
  }

  export type GameInvitationMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    senderId: string | null
    receiverId: string | null
    createdAt: Date | null
  }

  export type GameInvitationMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    senderId: string | null
    receiverId: string | null
    createdAt: Date | null
  }

  export type GameInvitationCountAggregateOutputType = {
    id: number
    gameId: number
    senderId: number
    receiverId: number
    createdAt: number
    _all: number
  }


  export type GameInvitationMinAggregateInputType = {
    id?: true
    gameId?: true
    senderId?: true
    receiverId?: true
    createdAt?: true
  }

  export type GameInvitationMaxAggregateInputType = {
    id?: true
    gameId?: true
    senderId?: true
    receiverId?: true
    createdAt?: true
  }

  export type GameInvitationCountAggregateInputType = {
    id?: true
    gameId?: true
    senderId?: true
    receiverId?: true
    createdAt?: true
    _all?: true
  }

  export type GameInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameInvitation to aggregate.
     */
    where?: GameInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameInvitations to fetch.
     */
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameInvitations
    **/
    _count?: true | GameInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameInvitationMaxAggregateInputType
  }

  export type GetGameInvitationAggregateType<T extends GameInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateGameInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameInvitation[P]>
      : GetScalarType<T[P], AggregateGameInvitation[P]>
  }




  export type GameInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameInvitationWhereInput
    orderBy?: GameInvitationOrderByWithAggregationInput | GameInvitationOrderByWithAggregationInput[]
    by: GameInvitationScalarFieldEnum[] | GameInvitationScalarFieldEnum
    having?: GameInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameInvitationCountAggregateInputType | true
    _min?: GameInvitationMinAggregateInputType
    _max?: GameInvitationMaxAggregateInputType
  }

  export type GameInvitationGroupByOutputType = {
    id: string
    gameId: string
    senderId: string
    receiverId: string
    createdAt: Date
    _count: GameInvitationCountAggregateOutputType | null
    _min: GameInvitationMinAggregateOutputType | null
    _max: GameInvitationMaxAggregateOutputType | null
  }

  type GetGameInvitationGroupByPayload<T extends GameInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], GameInvitationGroupByOutputType[P]>
        }
      >
    >


  export type GameInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    senderId?: boolean
    receiverId?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameInvitation"]>

  export type GameInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    senderId?: boolean
    receiverId?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameInvitation"]>

  export type GameInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    senderId?: boolean
    receiverId?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameInvitation"]>

  export type GameInvitationSelectScalar = {
    id?: boolean
    gameId?: boolean
    senderId?: boolean
    receiverId?: boolean
    createdAt?: boolean
  }

  export type GameInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "senderId" | "receiverId" | "createdAt", ExtArgs["result"]["gameInvitation"]>
  export type GameInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GameInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameInvitation"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      senderId: string
      receiverId: string
      createdAt: Date
    }, ExtArgs["result"]["gameInvitation"]>
    composites: {}
  }

  type GameInvitationGetPayload<S extends boolean | null | undefined | GameInvitationDefaultArgs> = $Result.GetResult<Prisma.$GameInvitationPayload, S>

  type GameInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameInvitationCountAggregateInputType | true
    }

  export interface GameInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameInvitation'], meta: { name: 'GameInvitation' } }
    /**
     * Find zero or one GameInvitation that matches the filter.
     * @param {GameInvitationFindUniqueArgs} args - Arguments to find a GameInvitation
     * @example
     * // Get one GameInvitation
     * const gameInvitation = await prisma.gameInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameInvitationFindUniqueArgs>(args: SelectSubset<T, GameInvitationFindUniqueArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameInvitationFindUniqueOrThrowArgs} args - Arguments to find a GameInvitation
     * @example
     * // Get one GameInvitation
     * const gameInvitation = await prisma.gameInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, GameInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationFindFirstArgs} args - Arguments to find a GameInvitation
     * @example
     * // Get one GameInvitation
     * const gameInvitation = await prisma.gameInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameInvitationFindFirstArgs>(args?: SelectSubset<T, GameInvitationFindFirstArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationFindFirstOrThrowArgs} args - Arguments to find a GameInvitation
     * @example
     * // Get one GameInvitation
     * const gameInvitation = await prisma.gameInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, GameInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameInvitations
     * const gameInvitations = await prisma.gameInvitation.findMany()
     * 
     * // Get first 10 GameInvitations
     * const gameInvitations = await prisma.gameInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameInvitationWithIdOnly = await prisma.gameInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameInvitationFindManyArgs>(args?: SelectSubset<T, GameInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameInvitation.
     * @param {GameInvitationCreateArgs} args - Arguments to create a GameInvitation.
     * @example
     * // Create one GameInvitation
     * const GameInvitation = await prisma.gameInvitation.create({
     *   data: {
     *     // ... data to create a GameInvitation
     *   }
     * })
     * 
     */
    create<T extends GameInvitationCreateArgs>(args: SelectSubset<T, GameInvitationCreateArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameInvitations.
     * @param {GameInvitationCreateManyArgs} args - Arguments to create many GameInvitations.
     * @example
     * // Create many GameInvitations
     * const gameInvitation = await prisma.gameInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameInvitationCreateManyArgs>(args?: SelectSubset<T, GameInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameInvitations and returns the data saved in the database.
     * @param {GameInvitationCreateManyAndReturnArgs} args - Arguments to create many GameInvitations.
     * @example
     * // Create many GameInvitations
     * const gameInvitation = await prisma.gameInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameInvitations and only return the `id`
     * const gameInvitationWithIdOnly = await prisma.gameInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, GameInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameInvitation.
     * @param {GameInvitationDeleteArgs} args - Arguments to delete one GameInvitation.
     * @example
     * // Delete one GameInvitation
     * const GameInvitation = await prisma.gameInvitation.delete({
     *   where: {
     *     // ... filter to delete one GameInvitation
     *   }
     * })
     * 
     */
    delete<T extends GameInvitationDeleteArgs>(args: SelectSubset<T, GameInvitationDeleteArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameInvitation.
     * @param {GameInvitationUpdateArgs} args - Arguments to update one GameInvitation.
     * @example
     * // Update one GameInvitation
     * const gameInvitation = await prisma.gameInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameInvitationUpdateArgs>(args: SelectSubset<T, GameInvitationUpdateArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameInvitations.
     * @param {GameInvitationDeleteManyArgs} args - Arguments to filter GameInvitations to delete.
     * @example
     * // Delete a few GameInvitations
     * const { count } = await prisma.gameInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameInvitationDeleteManyArgs>(args?: SelectSubset<T, GameInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameInvitations
     * const gameInvitation = await prisma.gameInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameInvitationUpdateManyArgs>(args: SelectSubset<T, GameInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameInvitations and returns the data updated in the database.
     * @param {GameInvitationUpdateManyAndReturnArgs} args - Arguments to update many GameInvitations.
     * @example
     * // Update many GameInvitations
     * const gameInvitation = await prisma.gameInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameInvitations and only return the `id`
     * const gameInvitationWithIdOnly = await prisma.gameInvitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, GameInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameInvitation.
     * @param {GameInvitationUpsertArgs} args - Arguments to update or create a GameInvitation.
     * @example
     * // Update or create a GameInvitation
     * const gameInvitation = await prisma.gameInvitation.upsert({
     *   create: {
     *     // ... data to create a GameInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameInvitation we want to update
     *   }
     * })
     */
    upsert<T extends GameInvitationUpsertArgs>(args: SelectSubset<T, GameInvitationUpsertArgs<ExtArgs>>): Prisma__GameInvitationClient<$Result.GetResult<Prisma.$GameInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationCountArgs} args - Arguments to filter GameInvitations to count.
     * @example
     * // Count the number of GameInvitations
     * const count = await prisma.gameInvitation.count({
     *   where: {
     *     // ... the filter for the GameInvitations we want to count
     *   }
     * })
    **/
    count<T extends GameInvitationCountArgs>(
      args?: Subset<T, GameInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameInvitationAggregateArgs>(args: Subset<T, GameInvitationAggregateArgs>): Prisma.PrismaPromise<GetGameInvitationAggregateType<T>>

    /**
     * Group by GameInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameInvitationGroupByArgs['orderBy'] }
        : { orderBy?: GameInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameInvitation model
   */
  readonly fields: GameInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameInvitation model
   */
  interface GameInvitationFieldRefs {
    readonly id: FieldRef<"GameInvitation", 'String'>
    readonly gameId: FieldRef<"GameInvitation", 'String'>
    readonly senderId: FieldRef<"GameInvitation", 'String'>
    readonly receiverId: FieldRef<"GameInvitation", 'String'>
    readonly createdAt: FieldRef<"GameInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameInvitation findUnique
   */
  export type GameInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GameInvitation to fetch.
     */
    where: GameInvitationWhereUniqueInput
  }

  /**
   * GameInvitation findUniqueOrThrow
   */
  export type GameInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GameInvitation to fetch.
     */
    where: GameInvitationWhereUniqueInput
  }

  /**
   * GameInvitation findFirst
   */
  export type GameInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GameInvitation to fetch.
     */
    where?: GameInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameInvitations to fetch.
     */
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameInvitations.
     */
    cursor?: GameInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameInvitations.
     */
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * GameInvitation findFirstOrThrow
   */
  export type GameInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GameInvitation to fetch.
     */
    where?: GameInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameInvitations to fetch.
     */
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameInvitations.
     */
    cursor?: GameInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameInvitations.
     */
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * GameInvitation findMany
   */
  export type GameInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GameInvitations to fetch.
     */
    where?: GameInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameInvitations to fetch.
     */
    orderBy?: GameInvitationOrderByWithRelationInput | GameInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameInvitations.
     */
    cursor?: GameInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameInvitations.
     */
    skip?: number
    distinct?: GameInvitationScalarFieldEnum | GameInvitationScalarFieldEnum[]
  }

  /**
   * GameInvitation create
   */
  export type GameInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a GameInvitation.
     */
    data: XOR<GameInvitationCreateInput, GameInvitationUncheckedCreateInput>
  }

  /**
   * GameInvitation createMany
   */
  export type GameInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameInvitations.
     */
    data: GameInvitationCreateManyInput | GameInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameInvitation createManyAndReturn
   */
  export type GameInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many GameInvitations.
     */
    data: GameInvitationCreateManyInput | GameInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameInvitation update
   */
  export type GameInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a GameInvitation.
     */
    data: XOR<GameInvitationUpdateInput, GameInvitationUncheckedUpdateInput>
    /**
     * Choose, which GameInvitation to update.
     */
    where: GameInvitationWhereUniqueInput
  }

  /**
   * GameInvitation updateMany
   */
  export type GameInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameInvitations.
     */
    data: XOR<GameInvitationUpdateManyMutationInput, GameInvitationUncheckedUpdateManyInput>
    /**
     * Filter which GameInvitations to update
     */
    where?: GameInvitationWhereInput
    /**
     * Limit how many GameInvitations to update.
     */
    limit?: number
  }

  /**
   * GameInvitation updateManyAndReturn
   */
  export type GameInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * The data used to update GameInvitations.
     */
    data: XOR<GameInvitationUpdateManyMutationInput, GameInvitationUncheckedUpdateManyInput>
    /**
     * Filter which GameInvitations to update
     */
    where?: GameInvitationWhereInput
    /**
     * Limit how many GameInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameInvitation upsert
   */
  export type GameInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the GameInvitation to update in case it exists.
     */
    where: GameInvitationWhereUniqueInput
    /**
     * In case the GameInvitation found by the `where` argument doesn't exist, create a new GameInvitation with this data.
     */
    create: XOR<GameInvitationCreateInput, GameInvitationUncheckedCreateInput>
    /**
     * In case the GameInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameInvitationUpdateInput, GameInvitationUncheckedUpdateInput>
  }

  /**
   * GameInvitation delete
   */
  export type GameInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
    /**
     * Filter which GameInvitation to delete.
     */
    where: GameInvitationWhereUniqueInput
  }

  /**
   * GameInvitation deleteMany
   */
  export type GameInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameInvitations to delete
     */
    where?: GameInvitationWhereInput
    /**
     * Limit how many GameInvitations to delete.
     */
    limit?: number
  }

  /**
   * GameInvitation without action
   */
  export type GameInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameInvitation
     */
    select?: GameInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameInvitation
     */
    omit?: GameInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInvitationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    googleId: 'googleId',
    name: 'name',
    email: 'email',
    password: 'password',
    image: 'image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserFriendshipScalarFieldEnum: {
    id: 'id',
    requesterId: 'requesterId',
    receiverId: 'receiverId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserFriendshipScalarFieldEnum = (typeof UserFriendshipScalarFieldEnum)[keyof typeof UserFriendshipScalarFieldEnum]


  export const UserStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gamesPlayed: 'gamesPlayed',
    gamesWon: 'gamesWon',
    gamesLost: 'gamesLost',
    highestScore: 'highestScore',
    generalaServed: 'generalaServed',
    straights: 'straights',
    fullHouses: 'fullHouses',
    pokers: 'pokers',
    generalas: 'generalas',
    averageScore: 'averageScore',
    winRate: 'winRate',
    totalTimePlayed: 'totalTimePlayed',
    lastGameDate: 'lastGameDate',
    elo: 'elo',
    eloChange: 'eloChange'
  };

  export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    status: 'status',
    name: 'name',
    winnerId: 'winnerId',
    maxPlayers: 'maxPlayers',
    minPlayers: 'minPlayers',
    turnTimeout: 'turnTimeout',
    password: 'password',
    ownerId: 'ownerId',
    currentTurnId: 'currentTurnId',
    diceValues: 'diceValues',
    rollCount: 'rollCount'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GameUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    ones: 'ones',
    twos: 'twos',
    threes: 'threes',
    fours: 'fours',
    fives: 'fives',
    sixes: 'sixes',
    straight: 'straight',
    fullHouse: 'fullHouse',
    poker: 'poker',
    generala: 'generala',
    double: 'double',
    totalScore: 'totalScore'
  };

  export type GameUserScalarFieldEnum = (typeof GameUserScalarFieldEnum)[keyof typeof GameUserScalarFieldEnum]


  export const GameInvitationScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    senderId: 'senderId',
    receiverId: 'receiverId',
    createdAt: 'createdAt'
  };

  export type GameInvitationScalarFieldEnum = (typeof GameInvitationScalarFieldEnum)[keyof typeof GameInvitationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    googleId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    stats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    games?: GameUserListRelationFilter
    friendships?: UserFriendshipListRelationFilter
    friendOf?: UserFriendshipListRelationFilter
    sentInvitations?: GameInvitationListRelationFilter
    receivedInvitations?: GameInvitationListRelationFilter
    ownedGames?: GameListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    stats?: UserStatsOrderByWithRelationInput
    games?: GameUserOrderByRelationAggregateInput
    friendships?: UserFriendshipOrderByRelationAggregateInput
    friendOf?: UserFriendshipOrderByRelationAggregateInput
    sentInvitations?: GameInvitationOrderByRelationAggregateInput
    receivedInvitations?: GameInvitationOrderByRelationAggregateInput
    ownedGames?: GameOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    stats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    games?: GameUserListRelationFilter
    friendships?: UserFriendshipListRelationFilter
    friendOf?: UserFriendshipListRelationFilter
    sentInvitations?: GameInvitationListRelationFilter
    receivedInvitations?: GameInvitationListRelationFilter
    ownedGames?: GameListRelationFilter
  }, "id" | "googleId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    googleId?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserFriendshipWhereInput = {
    AND?: UserFriendshipWhereInput | UserFriendshipWhereInput[]
    OR?: UserFriendshipWhereInput[]
    NOT?: UserFriendshipWhereInput | UserFriendshipWhereInput[]
    id?: StringFilter<"UserFriendship"> | string
    requesterId?: StringFilter<"UserFriendship"> | string
    receiverId?: StringFilter<"UserFriendship"> | string
    status?: StringFilter<"UserFriendship"> | string
    createdAt?: DateTimeFilter<"UserFriendship"> | Date | string
    updatedAt?: DateTimeFilter<"UserFriendship"> | Date | string
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserFriendshipOrderByWithRelationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requester?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type UserFriendshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requesterId_receiverId?: UserFriendshipRequesterIdReceiverIdCompoundUniqueInput
    AND?: UserFriendshipWhereInput | UserFriendshipWhereInput[]
    OR?: UserFriendshipWhereInput[]
    NOT?: UserFriendshipWhereInput | UserFriendshipWhereInput[]
    requesterId?: StringFilter<"UserFriendship"> | string
    receiverId?: StringFilter<"UserFriendship"> | string
    status?: StringFilter<"UserFriendship"> | string
    createdAt?: DateTimeFilter<"UserFriendship"> | Date | string
    updatedAt?: DateTimeFilter<"UserFriendship"> | Date | string
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "requesterId_receiverId">

  export type UserFriendshipOrderByWithAggregationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserFriendshipCountOrderByAggregateInput
    _max?: UserFriendshipMaxOrderByAggregateInput
    _min?: UserFriendshipMinOrderByAggregateInput
  }

  export type UserFriendshipScalarWhereWithAggregatesInput = {
    AND?: UserFriendshipScalarWhereWithAggregatesInput | UserFriendshipScalarWhereWithAggregatesInput[]
    OR?: UserFriendshipScalarWhereWithAggregatesInput[]
    NOT?: UserFriendshipScalarWhereWithAggregatesInput | UserFriendshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserFriendship"> | string
    requesterId?: StringWithAggregatesFilter<"UserFriendship"> | string
    receiverId?: StringWithAggregatesFilter<"UserFriendship"> | string
    status?: StringWithAggregatesFilter<"UserFriendship"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserFriendship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserFriendship"> | Date | string
  }

  export type UserStatsWhereInput = {
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    id?: StringFilter<"UserStats"> | string
    userId?: StringFilter<"UserStats"> | string
    gamesPlayed?: IntFilter<"UserStats"> | number
    gamesWon?: IntFilter<"UserStats"> | number
    gamesLost?: IntFilter<"UserStats"> | number
    highestScore?: IntFilter<"UserStats"> | number
    generalaServed?: IntFilter<"UserStats"> | number
    straights?: IntFilter<"UserStats"> | number
    fullHouses?: IntFilter<"UserStats"> | number
    pokers?: IntFilter<"UserStats"> | number
    generalas?: IntFilter<"UserStats"> | number
    averageScore?: FloatFilter<"UserStats"> | number
    winRate?: FloatFilter<"UserStats"> | number
    totalTimePlayed?: IntFilter<"UserStats"> | number
    lastGameDate?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    elo?: IntFilter<"UserStats"> | number
    eloChange?: IntFilter<"UserStats"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    lastGameDate?: SortOrderInput | SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    gamesPlayed?: IntFilter<"UserStats"> | number
    gamesWon?: IntFilter<"UserStats"> | number
    gamesLost?: IntFilter<"UserStats"> | number
    highestScore?: IntFilter<"UserStats"> | number
    generalaServed?: IntFilter<"UserStats"> | number
    straights?: IntFilter<"UserStats"> | number
    fullHouses?: IntFilter<"UserStats"> | number
    pokers?: IntFilter<"UserStats"> | number
    generalas?: IntFilter<"UserStats"> | number
    averageScore?: FloatFilter<"UserStats"> | number
    winRate?: FloatFilter<"UserStats"> | number
    totalTimePlayed?: IntFilter<"UserStats"> | number
    lastGameDate?: DateTimeNullableFilter<"UserStats"> | Date | string | null
    elo?: IntFilter<"UserStats"> | number
    eloChange?: IntFilter<"UserStats"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    lastGameDate?: SortOrderInput | SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
    _count?: UserStatsCountOrderByAggregateInput
    _avg?: UserStatsAvgOrderByAggregateInput
    _max?: UserStatsMaxOrderByAggregateInput
    _min?: UserStatsMinOrderByAggregateInput
    _sum?: UserStatsSumOrderByAggregateInput
  }

  export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    OR?: UserStatsScalarWhereWithAggregatesInput[]
    NOT?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStats"> | string
    userId?: StringWithAggregatesFilter<"UserStats"> | string
    gamesPlayed?: IntWithAggregatesFilter<"UserStats"> | number
    gamesWon?: IntWithAggregatesFilter<"UserStats"> | number
    gamesLost?: IntWithAggregatesFilter<"UserStats"> | number
    highestScore?: IntWithAggregatesFilter<"UserStats"> | number
    generalaServed?: IntWithAggregatesFilter<"UserStats"> | number
    straights?: IntWithAggregatesFilter<"UserStats"> | number
    fullHouses?: IntWithAggregatesFilter<"UserStats"> | number
    pokers?: IntWithAggregatesFilter<"UserStats"> | number
    generalas?: IntWithAggregatesFilter<"UserStats"> | number
    averageScore?: FloatWithAggregatesFilter<"UserStats"> | number
    winRate?: FloatWithAggregatesFilter<"UserStats"> | number
    totalTimePlayed?: IntWithAggregatesFilter<"UserStats"> | number
    lastGameDate?: DateTimeNullableWithAggregatesFilter<"UserStats"> | Date | string | null
    elo?: IntWithAggregatesFilter<"UserStats"> | number
    eloChange?: IntWithAggregatesFilter<"UserStats"> | number
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    status?: StringFilter<"Game"> | string
    name?: StringFilter<"Game"> | string
    winnerId?: StringNullableFilter<"Game"> | string | null
    maxPlayers?: IntFilter<"Game"> | number
    minPlayers?: IntFilter<"Game"> | number
    turnTimeout?: IntNullableFilter<"Game"> | number | null
    password?: StringNullableFilter<"Game"> | string | null
    ownerId?: StringFilter<"Game"> | string
    currentTurnId?: StringNullableFilter<"Game"> | string | null
    diceValues?: IntNullableListFilter<"Game">
    rollCount?: IntFilter<"Game"> | number
    players?: GameUserListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitations?: GameInvitationListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    name?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    currentTurnId?: SortOrderInput | SortOrder
    diceValues?: SortOrder
    rollCount?: SortOrder
    players?: GameUserOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
    invitations?: GameInvitationOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    createdAt?: DateTimeFilter<"Game"> | Date | string
    status?: StringFilter<"Game"> | string
    winnerId?: StringNullableFilter<"Game"> | string | null
    maxPlayers?: IntFilter<"Game"> | number
    minPlayers?: IntFilter<"Game"> | number
    turnTimeout?: IntNullableFilter<"Game"> | number | null
    password?: StringNullableFilter<"Game"> | string | null
    ownerId?: StringFilter<"Game"> | string
    currentTurnId?: StringNullableFilter<"Game"> | string | null
    diceValues?: IntNullableListFilter<"Game">
    rollCount?: IntFilter<"Game"> | number
    players?: GameUserListRelationFilter
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitations?: GameInvitationListRelationFilter
  }, "id" | "name">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    name?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    currentTurnId?: SortOrderInput | SortOrder
    diceValues?: SortOrder
    rollCount?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    status?: StringWithAggregatesFilter<"Game"> | string
    name?: StringWithAggregatesFilter<"Game"> | string
    winnerId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    maxPlayers?: IntWithAggregatesFilter<"Game"> | number
    minPlayers?: IntWithAggregatesFilter<"Game"> | number
    turnTimeout?: IntNullableWithAggregatesFilter<"Game"> | number | null
    password?: StringNullableWithAggregatesFilter<"Game"> | string | null
    ownerId?: StringWithAggregatesFilter<"Game"> | string
    currentTurnId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    diceValues?: IntNullableListFilter<"Game">
    rollCount?: IntWithAggregatesFilter<"Game"> | number
  }

  export type GameUserWhereInput = {
    AND?: GameUserWhereInput | GameUserWhereInput[]
    OR?: GameUserWhereInput[]
    NOT?: GameUserWhereInput | GameUserWhereInput[]
    id?: StringFilter<"GameUser"> | string
    userId?: StringFilter<"GameUser"> | string
    gameId?: StringFilter<"GameUser"> | string
    ones?: IntNullableFilter<"GameUser"> | number | null
    twos?: IntNullableFilter<"GameUser"> | number | null
    threes?: IntNullableFilter<"GameUser"> | number | null
    fours?: IntNullableFilter<"GameUser"> | number | null
    fives?: IntNullableFilter<"GameUser"> | number | null
    sixes?: IntNullableFilter<"GameUser"> | number | null
    straight?: IntNullableFilter<"GameUser"> | number | null
    fullHouse?: IntNullableFilter<"GameUser"> | number | null
    poker?: IntNullableFilter<"GameUser"> | number | null
    generala?: IntNullableFilter<"GameUser"> | number | null
    double?: IntNullableFilter<"GameUser"> | number | null
    totalScore?: IntNullableFilter<"GameUser"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }

  export type GameUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    ones?: SortOrderInput | SortOrder
    twos?: SortOrderInput | SortOrder
    threes?: SortOrderInput | SortOrder
    fours?: SortOrderInput | SortOrder
    fives?: SortOrderInput | SortOrder
    sixes?: SortOrderInput | SortOrder
    straight?: SortOrderInput | SortOrder
    fullHouse?: SortOrderInput | SortOrder
    poker?: SortOrderInput | SortOrder
    generala?: SortOrderInput | SortOrder
    double?: SortOrderInput | SortOrder
    totalScore?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    game?: GameOrderByWithRelationInput
  }

  export type GameUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_gameId?: GameUserUserIdGameIdCompoundUniqueInput
    AND?: GameUserWhereInput | GameUserWhereInput[]
    OR?: GameUserWhereInput[]
    NOT?: GameUserWhereInput | GameUserWhereInput[]
    userId?: StringFilter<"GameUser"> | string
    gameId?: StringFilter<"GameUser"> | string
    ones?: IntNullableFilter<"GameUser"> | number | null
    twos?: IntNullableFilter<"GameUser"> | number | null
    threes?: IntNullableFilter<"GameUser"> | number | null
    fours?: IntNullableFilter<"GameUser"> | number | null
    fives?: IntNullableFilter<"GameUser"> | number | null
    sixes?: IntNullableFilter<"GameUser"> | number | null
    straight?: IntNullableFilter<"GameUser"> | number | null
    fullHouse?: IntNullableFilter<"GameUser"> | number | null
    poker?: IntNullableFilter<"GameUser"> | number | null
    generala?: IntNullableFilter<"GameUser"> | number | null
    double?: IntNullableFilter<"GameUser"> | number | null
    totalScore?: IntNullableFilter<"GameUser"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }, "id" | "userId_gameId">

  export type GameUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    ones?: SortOrderInput | SortOrder
    twos?: SortOrderInput | SortOrder
    threes?: SortOrderInput | SortOrder
    fours?: SortOrderInput | SortOrder
    fives?: SortOrderInput | SortOrder
    sixes?: SortOrderInput | SortOrder
    straight?: SortOrderInput | SortOrder
    fullHouse?: SortOrderInput | SortOrder
    poker?: SortOrderInput | SortOrder
    generala?: SortOrderInput | SortOrder
    double?: SortOrderInput | SortOrder
    totalScore?: SortOrderInput | SortOrder
    _count?: GameUserCountOrderByAggregateInput
    _avg?: GameUserAvgOrderByAggregateInput
    _max?: GameUserMaxOrderByAggregateInput
    _min?: GameUserMinOrderByAggregateInput
    _sum?: GameUserSumOrderByAggregateInput
  }

  export type GameUserScalarWhereWithAggregatesInput = {
    AND?: GameUserScalarWhereWithAggregatesInput | GameUserScalarWhereWithAggregatesInput[]
    OR?: GameUserScalarWhereWithAggregatesInput[]
    NOT?: GameUserScalarWhereWithAggregatesInput | GameUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameUser"> | string
    userId?: StringWithAggregatesFilter<"GameUser"> | string
    gameId?: StringWithAggregatesFilter<"GameUser"> | string
    ones?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    twos?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    threes?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    fours?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    fives?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    sixes?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    straight?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    fullHouse?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    poker?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    generala?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    double?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
    totalScore?: IntNullableWithAggregatesFilter<"GameUser"> | number | null
  }

  export type GameInvitationWhereInput = {
    AND?: GameInvitationWhereInput | GameInvitationWhereInput[]
    OR?: GameInvitationWhereInput[]
    NOT?: GameInvitationWhereInput | GameInvitationWhereInput[]
    id?: StringFilter<"GameInvitation"> | string
    gameId?: StringFilter<"GameInvitation"> | string
    senderId?: StringFilter<"GameInvitation"> | string
    receiverId?: StringFilter<"GameInvitation"> | string
    createdAt?: DateTimeFilter<"GameInvitation"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GameInvitationOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    createdAt?: SortOrder
    game?: GameOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type GameInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gameId_receiverId?: GameInvitationGameIdReceiverIdCompoundUniqueInput
    AND?: GameInvitationWhereInput | GameInvitationWhereInput[]
    OR?: GameInvitationWhereInput[]
    NOT?: GameInvitationWhereInput | GameInvitationWhereInput[]
    gameId?: StringFilter<"GameInvitation"> | string
    senderId?: StringFilter<"GameInvitation"> | string
    receiverId?: StringFilter<"GameInvitation"> | string
    createdAt?: DateTimeFilter<"GameInvitation"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "gameId_receiverId">

  export type GameInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    createdAt?: SortOrder
    _count?: GameInvitationCountOrderByAggregateInput
    _max?: GameInvitationMaxOrderByAggregateInput
    _min?: GameInvitationMinOrderByAggregateInput
  }

  export type GameInvitationScalarWhereWithAggregatesInput = {
    AND?: GameInvitationScalarWhereWithAggregatesInput | GameInvitationScalarWhereWithAggregatesInput[]
    OR?: GameInvitationScalarWhereWithAggregatesInput[]
    NOT?: GameInvitationScalarWhereWithAggregatesInput | GameInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameInvitation"> | string
    gameId?: StringWithAggregatesFilter<"GameInvitation"> | string
    senderId?: StringWithAggregatesFilter<"GameInvitation"> | string
    receiverId?: StringWithAggregatesFilter<"GameInvitation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GameInvitation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserFriendshipCreateInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requester: UserCreateNestedOneWithoutFriendshipsInput
    receiver: UserCreateNestedOneWithoutFriendOfInput
  }

  export type UserFriendshipUncheckedCreateInput = {
    id?: string
    requesterId: string
    receiverId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFriendshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneRequiredWithoutFriendshipsNestedInput
    receiver?: UserUpdateOneRequiredWithoutFriendOfNestedInput
  }

  export type UserFriendshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFriendshipCreateManyInput = {
    id?: string
    requesterId: string
    receiverId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFriendshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFriendshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsCreateInput = {
    id?: string
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    highestScore?: number
    generalaServed?: number
    straights?: number
    fullHouses?: number
    pokers?: number
    generalas?: number
    averageScore?: number
    winRate?: number
    totalTimePlayed?: number
    lastGameDate?: Date | string | null
    elo?: number
    eloChange?: number
    user: UserCreateNestedOneWithoutStatsInput
  }

  export type UserStatsUncheckedCreateInput = {
    id?: string
    userId: string
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    highestScore?: number
    generalaServed?: number
    straights?: number
    fullHouses?: number
    pokers?: number
    generalas?: number
    averageScore?: number
    winRate?: number
    totalTimePlayed?: number
    lastGameDate?: Date | string | null
    elo?: number
    eloChange?: number
  }

  export type UserStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
  }

  export type UserStatsCreateManyInput = {
    id?: string
    userId: string
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    highestScore?: number
    generalaServed?: number
    straights?: number
    fullHouses?: number
    pokers?: number
    generalas?: number
    averageScore?: number
    winRate?: number
    totalTimePlayed?: number
    lastGameDate?: Date | string | null
    elo?: number
    eloChange?: number
  }

  export type UserStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
  }

  export type UserStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
  }

  export type GameCreateInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserCreateNestedManyWithoutGameInput
    owner: UserCreateNestedOneWithoutOwnedGamesInput
    invitations?: GameInvitationCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    ownerId: string
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserUncheckedCreateNestedManyWithoutGameInput
    invitations?: GameInvitationUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUpdateManyWithoutGameNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedGamesNestedInput
    invitations?: GameInvitationUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUncheckedUpdateManyWithoutGameNestedInput
    invitations?: GameInvitationUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    ownerId: string
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
  }

  export type GameUserCreateInput = {
    id?: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
    user: UserCreateNestedOneWithoutGamesInput
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GameUserUncheckedCreateInput = {
    id?: string
    userId: string
    gameId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type GameUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutGamesNestedInput
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GameUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameUserCreateManyInput = {
    id?: string
    userId: string
    gameId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type GameUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameInvitationCreateInput = {
    id?: string
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutInvitationsInput
    sender: UserCreateNestedOneWithoutSentInvitationsInput
    receiver: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type GameInvitationUncheckedCreateInput = {
    id?: string
    gameId: string
    senderId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutInvitationsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
  }

  export type GameInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationCreateManyInput = {
    id?: string
    gameId: string
    senderId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserStatsNullableScalarRelationFilter = {
    is?: UserStatsWhereInput | null
    isNot?: UserStatsWhereInput | null
  }

  export type GameUserListRelationFilter = {
    every?: GameUserWhereInput
    some?: GameUserWhereInput
    none?: GameUserWhereInput
  }

  export type UserFriendshipListRelationFilter = {
    every?: UserFriendshipWhereInput
    some?: UserFriendshipWhereInput
    none?: UserFriendshipWhereInput
  }

  export type GameInvitationListRelationFilter = {
    every?: GameInvitationWhereInput
    some?: GameInvitationWhereInput
    none?: GameInvitationWhereInput
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserFriendshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserFriendshipRequesterIdReceiverIdCompoundUniqueInput = {
    requesterId: string
    receiverId: string
  }

  export type UserFriendshipCountOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserFriendshipMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserFriendshipMinOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    lastGameDate?: SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
  }

  export type UserStatsAvgOrderByAggregateInput = {
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
  }

  export type UserStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    lastGameDate?: SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
  }

  export type UserStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    lastGameDate?: SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
  }

  export type UserStatsSumOrderByAggregateInput = {
    gamesPlayed?: SortOrder
    gamesWon?: SortOrder
    gamesLost?: SortOrder
    highestScore?: SortOrder
    generalaServed?: SortOrder
    straights?: SortOrder
    fullHouses?: SortOrder
    pokers?: SortOrder
    generalas?: SortOrder
    averageScore?: SortOrder
    winRate?: SortOrder
    totalTimePlayed?: SortOrder
    elo?: SortOrder
    eloChange?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    name?: SortOrder
    winnerId?: SortOrder
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrder
    password?: SortOrder
    ownerId?: SortOrder
    currentTurnId?: SortOrder
    diceValues?: SortOrder
    rollCount?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrder
    diceValues?: SortOrder
    rollCount?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    name?: SortOrder
    winnerId?: SortOrder
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrder
    password?: SortOrder
    ownerId?: SortOrder
    currentTurnId?: SortOrder
    rollCount?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    name?: SortOrder
    winnerId?: SortOrder
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrder
    password?: SortOrder
    ownerId?: SortOrder
    currentTurnId?: SortOrder
    rollCount?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    maxPlayers?: SortOrder
    minPlayers?: SortOrder
    turnTimeout?: SortOrder
    diceValues?: SortOrder
    rollCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type GameUserUserIdGameIdCompoundUniqueInput = {
    userId: string
    gameId: string
  }

  export type GameUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    ones?: SortOrder
    twos?: SortOrder
    threes?: SortOrder
    fours?: SortOrder
    fives?: SortOrder
    sixes?: SortOrder
    straight?: SortOrder
    fullHouse?: SortOrder
    poker?: SortOrder
    generala?: SortOrder
    double?: SortOrder
    totalScore?: SortOrder
  }

  export type GameUserAvgOrderByAggregateInput = {
    ones?: SortOrder
    twos?: SortOrder
    threes?: SortOrder
    fours?: SortOrder
    fives?: SortOrder
    sixes?: SortOrder
    straight?: SortOrder
    fullHouse?: SortOrder
    poker?: SortOrder
    generala?: SortOrder
    double?: SortOrder
    totalScore?: SortOrder
  }

  export type GameUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    ones?: SortOrder
    twos?: SortOrder
    threes?: SortOrder
    fours?: SortOrder
    fives?: SortOrder
    sixes?: SortOrder
    straight?: SortOrder
    fullHouse?: SortOrder
    poker?: SortOrder
    generala?: SortOrder
    double?: SortOrder
    totalScore?: SortOrder
  }

  export type GameUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    ones?: SortOrder
    twos?: SortOrder
    threes?: SortOrder
    fours?: SortOrder
    fives?: SortOrder
    sixes?: SortOrder
    straight?: SortOrder
    fullHouse?: SortOrder
    poker?: SortOrder
    generala?: SortOrder
    double?: SortOrder
    totalScore?: SortOrder
  }

  export type GameUserSumOrderByAggregateInput = {
    ones?: SortOrder
    twos?: SortOrder
    threes?: SortOrder
    fours?: SortOrder
    fives?: SortOrder
    sixes?: SortOrder
    straight?: SortOrder
    fullHouse?: SortOrder
    poker?: SortOrder
    generala?: SortOrder
    double?: SortOrder
    totalScore?: SortOrder
  }

  export type GameInvitationGameIdReceiverIdCompoundUniqueInput = {
    gameId: string
    receiverId: string
  }

  export type GameInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type GameUserCreateNestedManyWithoutUserInput = {
    create?: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput> | GameUserCreateWithoutUserInput[] | GameUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutUserInput | GameUserCreateOrConnectWithoutUserInput[]
    createMany?: GameUserCreateManyUserInputEnvelope
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
  }

  export type UserFriendshipCreateNestedManyWithoutRequesterInput = {
    create?: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput> | UserFriendshipCreateWithoutRequesterInput[] | UserFriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutRequesterInput | UserFriendshipCreateOrConnectWithoutRequesterInput[]
    createMany?: UserFriendshipCreateManyRequesterInputEnvelope
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
  }

  export type UserFriendshipCreateNestedManyWithoutReceiverInput = {
    create?: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput> | UserFriendshipCreateWithoutReceiverInput[] | UserFriendshipUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutReceiverInput | UserFriendshipCreateOrConnectWithoutReceiverInput[]
    createMany?: UserFriendshipCreateManyReceiverInputEnvelope
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
  }

  export type GameInvitationCreateNestedManyWithoutSenderInput = {
    create?: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput> | GameInvitationCreateWithoutSenderInput[] | GameInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutSenderInput | GameInvitationCreateOrConnectWithoutSenderInput[]
    createMany?: GameInvitationCreateManySenderInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type GameInvitationCreateNestedManyWithoutReceiverInput = {
    create?: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput> | GameInvitationCreateWithoutReceiverInput[] | GameInvitationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutReceiverInput | GameInvitationCreateOrConnectWithoutReceiverInput[]
    createMany?: GameInvitationCreateManyReceiverInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput> | GameCreateWithoutOwnerInput[] | GameUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutOwnerInput | GameCreateOrConnectWithoutOwnerInput[]
    createMany?: GameCreateManyOwnerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type UserStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type GameUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput> | GameUserCreateWithoutUserInput[] | GameUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutUserInput | GameUserCreateOrConnectWithoutUserInput[]
    createMany?: GameUserCreateManyUserInputEnvelope
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
  }

  export type UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput> | UserFriendshipCreateWithoutRequesterInput[] | UserFriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutRequesterInput | UserFriendshipCreateOrConnectWithoutRequesterInput[]
    createMany?: UserFriendshipCreateManyRequesterInputEnvelope
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
  }

  export type UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput> | UserFriendshipCreateWithoutReceiverInput[] | UserFriendshipUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutReceiverInput | UserFriendshipCreateOrConnectWithoutReceiverInput[]
    createMany?: UserFriendshipCreateManyReceiverInputEnvelope
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
  }

  export type GameInvitationUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput> | GameInvitationCreateWithoutSenderInput[] | GameInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutSenderInput | GameInvitationCreateOrConnectWithoutSenderInput[]
    createMany?: GameInvitationCreateManySenderInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type GameInvitationUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput> | GameInvitationCreateWithoutReceiverInput[] | GameInvitationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutReceiverInput | GameInvitationCreateOrConnectWithoutReceiverInput[]
    createMany?: GameInvitationCreateManyReceiverInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput> | GameCreateWithoutOwnerInput[] | GameUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutOwnerInput | GameCreateOrConnectWithoutOwnerInput[]
    createMany?: GameCreateManyOwnerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type GameUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput> | GameUserCreateWithoutUserInput[] | GameUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutUserInput | GameUserCreateOrConnectWithoutUserInput[]
    upsert?: GameUserUpsertWithWhereUniqueWithoutUserInput | GameUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameUserCreateManyUserInputEnvelope
    set?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    disconnect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    delete?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    update?: GameUserUpdateWithWhereUniqueWithoutUserInput | GameUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameUserUpdateManyWithWhereWithoutUserInput | GameUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
  }

  export type UserFriendshipUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput> | UserFriendshipCreateWithoutRequesterInput[] | UserFriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutRequesterInput | UserFriendshipCreateOrConnectWithoutRequesterInput[]
    upsert?: UserFriendshipUpsertWithWhereUniqueWithoutRequesterInput | UserFriendshipUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: UserFriendshipCreateManyRequesterInputEnvelope
    set?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    disconnect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    delete?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    update?: UserFriendshipUpdateWithWhereUniqueWithoutRequesterInput | UserFriendshipUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: UserFriendshipUpdateManyWithWhereWithoutRequesterInput | UserFriendshipUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
  }

  export type UserFriendshipUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput> | UserFriendshipCreateWithoutReceiverInput[] | UserFriendshipUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutReceiverInput | UserFriendshipCreateOrConnectWithoutReceiverInput[]
    upsert?: UserFriendshipUpsertWithWhereUniqueWithoutReceiverInput | UserFriendshipUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: UserFriendshipCreateManyReceiverInputEnvelope
    set?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    disconnect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    delete?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    update?: UserFriendshipUpdateWithWhereUniqueWithoutReceiverInput | UserFriendshipUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: UserFriendshipUpdateManyWithWhereWithoutReceiverInput | UserFriendshipUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
  }

  export type GameInvitationUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput> | GameInvitationCreateWithoutSenderInput[] | GameInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutSenderInput | GameInvitationCreateOrConnectWithoutSenderInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutSenderInput | GameInvitationUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GameInvitationCreateManySenderInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutSenderInput | GameInvitationUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutSenderInput | GameInvitationUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type GameInvitationUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput> | GameInvitationCreateWithoutReceiverInput[] | GameInvitationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutReceiverInput | GameInvitationCreateOrConnectWithoutReceiverInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutReceiverInput | GameInvitationUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: GameInvitationCreateManyReceiverInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutReceiverInput | GameInvitationUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutReceiverInput | GameInvitationUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type GameUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput> | GameCreateWithoutOwnerInput[] | GameUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutOwnerInput | GameCreateOrConnectWithoutOwnerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutOwnerInput | GameUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GameCreateManyOwnerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutOwnerInput | GameUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutOwnerInput | GameUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type UserStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type GameUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput> | GameUserCreateWithoutUserInput[] | GameUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutUserInput | GameUserCreateOrConnectWithoutUserInput[]
    upsert?: GameUserUpsertWithWhereUniqueWithoutUserInput | GameUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GameUserCreateManyUserInputEnvelope
    set?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    disconnect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    delete?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    update?: GameUserUpdateWithWhereUniqueWithoutUserInput | GameUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameUserUpdateManyWithWhereWithoutUserInput | GameUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
  }

  export type UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput> | UserFriendshipCreateWithoutRequesterInput[] | UserFriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutRequesterInput | UserFriendshipCreateOrConnectWithoutRequesterInput[]
    upsert?: UserFriendshipUpsertWithWhereUniqueWithoutRequesterInput | UserFriendshipUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: UserFriendshipCreateManyRequesterInputEnvelope
    set?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    disconnect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    delete?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    update?: UserFriendshipUpdateWithWhereUniqueWithoutRequesterInput | UserFriendshipUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: UserFriendshipUpdateManyWithWhereWithoutRequesterInput | UserFriendshipUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
  }

  export type UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput> | UserFriendshipCreateWithoutReceiverInput[] | UserFriendshipUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: UserFriendshipCreateOrConnectWithoutReceiverInput | UserFriendshipCreateOrConnectWithoutReceiverInput[]
    upsert?: UserFriendshipUpsertWithWhereUniqueWithoutReceiverInput | UserFriendshipUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: UserFriendshipCreateManyReceiverInputEnvelope
    set?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    disconnect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    delete?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    connect?: UserFriendshipWhereUniqueInput | UserFriendshipWhereUniqueInput[]
    update?: UserFriendshipUpdateWithWhereUniqueWithoutReceiverInput | UserFriendshipUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: UserFriendshipUpdateManyWithWhereWithoutReceiverInput | UserFriendshipUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
  }

  export type GameInvitationUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput> | GameInvitationCreateWithoutSenderInput[] | GameInvitationUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutSenderInput | GameInvitationCreateOrConnectWithoutSenderInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutSenderInput | GameInvitationUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: GameInvitationCreateManySenderInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutSenderInput | GameInvitationUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutSenderInput | GameInvitationUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput> | GameInvitationCreateWithoutReceiverInput[] | GameInvitationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutReceiverInput | GameInvitationCreateOrConnectWithoutReceiverInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutReceiverInput | GameInvitationUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: GameInvitationCreateManyReceiverInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutReceiverInput | GameInvitationUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutReceiverInput | GameInvitationUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput> | GameCreateWithoutOwnerInput[] | GameUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutOwnerInput | GameCreateOrConnectWithoutOwnerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutOwnerInput | GameUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GameCreateManyOwnerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutOwnerInput | GameUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutOwnerInput | GameUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFriendshipsInput = {
    create?: XOR<UserCreateWithoutFriendshipsInput, UserUncheckedCreateWithoutFriendshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendshipsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendOfInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutFriendshipsNestedInput = {
    create?: XOR<UserCreateWithoutFriendshipsInput, UserUncheckedCreateWithoutFriendshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendshipsInput
    upsert?: UserUpsertWithoutFriendshipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendshipsInput, UserUpdateWithoutFriendshipsInput>, UserUncheckedUpdateWithoutFriendshipsInput>
  }

  export type UserUpdateOneRequiredWithoutFriendOfNestedInput = {
    create?: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendOfInput
    upsert?: UserUpsertWithoutFriendOfInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendOfInput, UserUpdateWithoutFriendOfInput>, UserUncheckedUpdateWithoutFriendOfInput>
  }

  export type UserCreateNestedOneWithoutStatsInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    upsert?: UserUpsertWithoutStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatsInput, UserUpdateWithoutStatsInput>, UserUncheckedUpdateWithoutStatsInput>
  }

  export type GameCreatediceValuesInput = {
    set: number[]
  }

  export type GameUserCreateNestedManyWithoutGameInput = {
    create?: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput> | GameUserCreateWithoutGameInput[] | GameUserUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutGameInput | GameUserCreateOrConnectWithoutGameInput[]
    createMany?: GameUserCreateManyGameInputEnvelope
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutOwnedGamesInput = {
    create?: XOR<UserCreateWithoutOwnedGamesInput, UserUncheckedCreateWithoutOwnedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGamesInput
    connect?: UserWhereUniqueInput
  }

  export type GameInvitationCreateNestedManyWithoutGameInput = {
    create?: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput> | GameInvitationCreateWithoutGameInput[] | GameInvitationUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutGameInput | GameInvitationCreateOrConnectWithoutGameInput[]
    createMany?: GameInvitationCreateManyGameInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type GameUserUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput> | GameUserCreateWithoutGameInput[] | GameUserUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutGameInput | GameUserCreateOrConnectWithoutGameInput[]
    createMany?: GameUserCreateManyGameInputEnvelope
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
  }

  export type GameInvitationUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput> | GameInvitationCreateWithoutGameInput[] | GameInvitationUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutGameInput | GameInvitationCreateOrConnectWithoutGameInput[]
    createMany?: GameInvitationCreateManyGameInputEnvelope
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdatediceValuesInput = {
    set?: number[]
    push?: number | number[]
  }

  export type GameUserUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput> | GameUserCreateWithoutGameInput[] | GameUserUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutGameInput | GameUserCreateOrConnectWithoutGameInput[]
    upsert?: GameUserUpsertWithWhereUniqueWithoutGameInput | GameUserUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameUserCreateManyGameInputEnvelope
    set?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    disconnect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    delete?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    update?: GameUserUpdateWithWhereUniqueWithoutGameInput | GameUserUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameUserUpdateManyWithWhereWithoutGameInput | GameUserUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedGamesNestedInput = {
    create?: XOR<UserCreateWithoutOwnedGamesInput, UserUncheckedCreateWithoutOwnedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGamesInput
    upsert?: UserUpsertWithoutOwnedGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedGamesInput, UserUpdateWithoutOwnedGamesInput>, UserUncheckedUpdateWithoutOwnedGamesInput>
  }

  export type GameInvitationUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput> | GameInvitationCreateWithoutGameInput[] | GameInvitationUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutGameInput | GameInvitationCreateOrConnectWithoutGameInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutGameInput | GameInvitationUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameInvitationCreateManyGameInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutGameInput | GameInvitationUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutGameInput | GameInvitationUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type GameUserUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput> | GameUserCreateWithoutGameInput[] | GameUserUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameUserCreateOrConnectWithoutGameInput | GameUserCreateOrConnectWithoutGameInput[]
    upsert?: GameUserUpsertWithWhereUniqueWithoutGameInput | GameUserUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameUserCreateManyGameInputEnvelope
    set?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    disconnect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    delete?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    connect?: GameUserWhereUniqueInput | GameUserWhereUniqueInput[]
    update?: GameUserUpdateWithWhereUniqueWithoutGameInput | GameUserUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameUserUpdateManyWithWhereWithoutGameInput | GameUserUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
  }

  export type GameInvitationUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput> | GameInvitationCreateWithoutGameInput[] | GameInvitationUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameInvitationCreateOrConnectWithoutGameInput | GameInvitationCreateOrConnectWithoutGameInput[]
    upsert?: GameInvitationUpsertWithWhereUniqueWithoutGameInput | GameInvitationUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameInvitationCreateManyGameInputEnvelope
    set?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    disconnect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    delete?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    connect?: GameInvitationWhereUniqueInput | GameInvitationWhereUniqueInput[]
    update?: GameInvitationUpdateWithWhereUniqueWithoutGameInput | GameInvitationUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameInvitationUpdateManyWithWhereWithoutGameInput | GameInvitationUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGamesInput = {
    create?: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesInput
    connect?: UserWhereUniqueInput
  }

  export type GameCreateNestedOneWithoutPlayersInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    connect?: GameWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesInput
    upsert?: UserUpsertWithoutGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesInput, UserUpdateWithoutGamesInput>, UserUncheckedUpdateWithoutGamesInput>
  }

  export type GameUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    upsert?: GameUpsertWithoutPlayersInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPlayersInput, GameUpdateWithoutPlayersInput>, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<GameCreateWithoutInvitationsInput, GameUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: GameCreateOrConnectWithoutInvitationsInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentInvitationsInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedInvitationsInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<GameCreateWithoutInvitationsInput, GameUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: GameCreateOrConnectWithoutInvitationsInput
    upsert?: GameUpsertWithoutInvitationsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutInvitationsInput, GameUpdateWithoutInvitationsInput>, GameUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutSentInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    upsert?: UserUpsertWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentInvitationsInput, UserUpdateWithoutSentInvitationsInput>, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    upsert?: UserUpsertWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedInvitationsInput, UserUpdateWithoutReceivedInvitationsInput>, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserStatsCreateWithoutUserInput = {
    id?: string
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    highestScore?: number
    generalaServed?: number
    straights?: number
    fullHouses?: number
    pokers?: number
    generalas?: number
    averageScore?: number
    winRate?: number
    totalTimePlayed?: number
    lastGameDate?: Date | string | null
    elo?: number
    eloChange?: number
  }

  export type UserStatsUncheckedCreateWithoutUserInput = {
    id?: string
    gamesPlayed?: number
    gamesWon?: number
    gamesLost?: number
    highestScore?: number
    generalaServed?: number
    straights?: number
    fullHouses?: number
    pokers?: number
    generalas?: number
    averageScore?: number
    winRate?: number
    totalTimePlayed?: number
    lastGameDate?: Date | string | null
    elo?: number
    eloChange?: number
  }

  export type UserStatsCreateOrConnectWithoutUserInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
  }

  export type GameUserCreateWithoutUserInput = {
    id?: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GameUserUncheckedCreateWithoutUserInput = {
    id?: string
    gameId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type GameUserCreateOrConnectWithoutUserInput = {
    where: GameUserWhereUniqueInput
    create: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput>
  }

  export type GameUserCreateManyUserInputEnvelope = {
    data: GameUserCreateManyUserInput | GameUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserFriendshipCreateWithoutRequesterInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutFriendOfInput
  }

  export type UserFriendshipUncheckedCreateWithoutRequesterInput = {
    id?: string
    receiverId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFriendshipCreateOrConnectWithoutRequesterInput = {
    where: UserFriendshipWhereUniqueInput
    create: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput>
  }

  export type UserFriendshipCreateManyRequesterInputEnvelope = {
    data: UserFriendshipCreateManyRequesterInput | UserFriendshipCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type UserFriendshipCreateWithoutReceiverInput = {
    id?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requester: UserCreateNestedOneWithoutFriendshipsInput
  }

  export type UserFriendshipUncheckedCreateWithoutReceiverInput = {
    id?: string
    requesterId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFriendshipCreateOrConnectWithoutReceiverInput = {
    where: UserFriendshipWhereUniqueInput
    create: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput>
  }

  export type UserFriendshipCreateManyReceiverInputEnvelope = {
    data: UserFriendshipCreateManyReceiverInput | UserFriendshipCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type GameInvitationCreateWithoutSenderInput = {
    id?: string
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutInvitationsInput
    receiver: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type GameInvitationUncheckedCreateWithoutSenderInput = {
    id?: string
    gameId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameInvitationCreateOrConnectWithoutSenderInput = {
    where: GameInvitationWhereUniqueInput
    create: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput>
  }

  export type GameInvitationCreateManySenderInputEnvelope = {
    data: GameInvitationCreateManySenderInput | GameInvitationCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type GameInvitationCreateWithoutReceiverInput = {
    id?: string
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutInvitationsInput
    sender: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type GameInvitationUncheckedCreateWithoutReceiverInput = {
    id?: string
    gameId: string
    senderId: string
    createdAt?: Date | string
  }

  export type GameInvitationCreateOrConnectWithoutReceiverInput = {
    where: GameInvitationWhereUniqueInput
    create: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput>
  }

  export type GameInvitationCreateManyReceiverInputEnvelope = {
    data: GameInvitationCreateManyReceiverInput | GameInvitationCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutOwnerInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserCreateNestedManyWithoutGameInput
    invitations?: GameInvitationCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutOwnerInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserUncheckedCreateNestedManyWithoutGameInput
    invitations?: GameInvitationUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutOwnerInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput>
  }

  export type GameCreateManyOwnerInputEnvelope = {
    data: GameCreateManyOwnerInput | GameCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserStatsUpsertWithoutUserInput = {
    update: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
  }

  export type UserStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    gamesWon?: IntFieldUpdateOperationsInput | number
    gamesLost?: IntFieldUpdateOperationsInput | number
    highestScore?: IntFieldUpdateOperationsInput | number
    generalaServed?: IntFieldUpdateOperationsInput | number
    straights?: IntFieldUpdateOperationsInput | number
    fullHouses?: IntFieldUpdateOperationsInput | number
    pokers?: IntFieldUpdateOperationsInput | number
    generalas?: IntFieldUpdateOperationsInput | number
    averageScore?: FloatFieldUpdateOperationsInput | number
    winRate?: FloatFieldUpdateOperationsInput | number
    totalTimePlayed?: IntFieldUpdateOperationsInput | number
    lastGameDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elo?: IntFieldUpdateOperationsInput | number
    eloChange?: IntFieldUpdateOperationsInput | number
  }

  export type GameUserUpsertWithWhereUniqueWithoutUserInput = {
    where: GameUserWhereUniqueInput
    update: XOR<GameUserUpdateWithoutUserInput, GameUserUncheckedUpdateWithoutUserInput>
    create: XOR<GameUserCreateWithoutUserInput, GameUserUncheckedCreateWithoutUserInput>
  }

  export type GameUserUpdateWithWhereUniqueWithoutUserInput = {
    where: GameUserWhereUniqueInput
    data: XOR<GameUserUpdateWithoutUserInput, GameUserUncheckedUpdateWithoutUserInput>
  }

  export type GameUserUpdateManyWithWhereWithoutUserInput = {
    where: GameUserScalarWhereInput
    data: XOR<GameUserUpdateManyMutationInput, GameUserUncheckedUpdateManyWithoutUserInput>
  }

  export type GameUserScalarWhereInput = {
    AND?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
    OR?: GameUserScalarWhereInput[]
    NOT?: GameUserScalarWhereInput | GameUserScalarWhereInput[]
    id?: StringFilter<"GameUser"> | string
    userId?: StringFilter<"GameUser"> | string
    gameId?: StringFilter<"GameUser"> | string
    ones?: IntNullableFilter<"GameUser"> | number | null
    twos?: IntNullableFilter<"GameUser"> | number | null
    threes?: IntNullableFilter<"GameUser"> | number | null
    fours?: IntNullableFilter<"GameUser"> | number | null
    fives?: IntNullableFilter<"GameUser"> | number | null
    sixes?: IntNullableFilter<"GameUser"> | number | null
    straight?: IntNullableFilter<"GameUser"> | number | null
    fullHouse?: IntNullableFilter<"GameUser"> | number | null
    poker?: IntNullableFilter<"GameUser"> | number | null
    generala?: IntNullableFilter<"GameUser"> | number | null
    double?: IntNullableFilter<"GameUser"> | number | null
    totalScore?: IntNullableFilter<"GameUser"> | number | null
  }

  export type UserFriendshipUpsertWithWhereUniqueWithoutRequesterInput = {
    where: UserFriendshipWhereUniqueInput
    update: XOR<UserFriendshipUpdateWithoutRequesterInput, UserFriendshipUncheckedUpdateWithoutRequesterInput>
    create: XOR<UserFriendshipCreateWithoutRequesterInput, UserFriendshipUncheckedCreateWithoutRequesterInput>
  }

  export type UserFriendshipUpdateWithWhereUniqueWithoutRequesterInput = {
    where: UserFriendshipWhereUniqueInput
    data: XOR<UserFriendshipUpdateWithoutRequesterInput, UserFriendshipUncheckedUpdateWithoutRequesterInput>
  }

  export type UserFriendshipUpdateManyWithWhereWithoutRequesterInput = {
    where: UserFriendshipScalarWhereInput
    data: XOR<UserFriendshipUpdateManyMutationInput, UserFriendshipUncheckedUpdateManyWithoutRequesterInput>
  }

  export type UserFriendshipScalarWhereInput = {
    AND?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
    OR?: UserFriendshipScalarWhereInput[]
    NOT?: UserFriendshipScalarWhereInput | UserFriendshipScalarWhereInput[]
    id?: StringFilter<"UserFriendship"> | string
    requesterId?: StringFilter<"UserFriendship"> | string
    receiverId?: StringFilter<"UserFriendship"> | string
    status?: StringFilter<"UserFriendship"> | string
    createdAt?: DateTimeFilter<"UserFriendship"> | Date | string
    updatedAt?: DateTimeFilter<"UserFriendship"> | Date | string
  }

  export type UserFriendshipUpsertWithWhereUniqueWithoutReceiverInput = {
    where: UserFriendshipWhereUniqueInput
    update: XOR<UserFriendshipUpdateWithoutReceiverInput, UserFriendshipUncheckedUpdateWithoutReceiverInput>
    create: XOR<UserFriendshipCreateWithoutReceiverInput, UserFriendshipUncheckedCreateWithoutReceiverInput>
  }

  export type UserFriendshipUpdateWithWhereUniqueWithoutReceiverInput = {
    where: UserFriendshipWhereUniqueInput
    data: XOR<UserFriendshipUpdateWithoutReceiverInput, UserFriendshipUncheckedUpdateWithoutReceiverInput>
  }

  export type UserFriendshipUpdateManyWithWhereWithoutReceiverInput = {
    where: UserFriendshipScalarWhereInput
    data: XOR<UserFriendshipUpdateManyMutationInput, UserFriendshipUncheckedUpdateManyWithoutReceiverInput>
  }

  export type GameInvitationUpsertWithWhereUniqueWithoutSenderInput = {
    where: GameInvitationWhereUniqueInput
    update: XOR<GameInvitationUpdateWithoutSenderInput, GameInvitationUncheckedUpdateWithoutSenderInput>
    create: XOR<GameInvitationCreateWithoutSenderInput, GameInvitationUncheckedCreateWithoutSenderInput>
  }

  export type GameInvitationUpdateWithWhereUniqueWithoutSenderInput = {
    where: GameInvitationWhereUniqueInput
    data: XOR<GameInvitationUpdateWithoutSenderInput, GameInvitationUncheckedUpdateWithoutSenderInput>
  }

  export type GameInvitationUpdateManyWithWhereWithoutSenderInput = {
    where: GameInvitationScalarWhereInput
    data: XOR<GameInvitationUpdateManyMutationInput, GameInvitationUncheckedUpdateManyWithoutSenderInput>
  }

  export type GameInvitationScalarWhereInput = {
    AND?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
    OR?: GameInvitationScalarWhereInput[]
    NOT?: GameInvitationScalarWhereInput | GameInvitationScalarWhereInput[]
    id?: StringFilter<"GameInvitation"> | string
    gameId?: StringFilter<"GameInvitation"> | string
    senderId?: StringFilter<"GameInvitation"> | string
    receiverId?: StringFilter<"GameInvitation"> | string
    createdAt?: DateTimeFilter<"GameInvitation"> | Date | string
  }

  export type GameInvitationUpsertWithWhereUniqueWithoutReceiverInput = {
    where: GameInvitationWhereUniqueInput
    update: XOR<GameInvitationUpdateWithoutReceiverInput, GameInvitationUncheckedUpdateWithoutReceiverInput>
    create: XOR<GameInvitationCreateWithoutReceiverInput, GameInvitationUncheckedCreateWithoutReceiverInput>
  }

  export type GameInvitationUpdateWithWhereUniqueWithoutReceiverInput = {
    where: GameInvitationWhereUniqueInput
    data: XOR<GameInvitationUpdateWithoutReceiverInput, GameInvitationUncheckedUpdateWithoutReceiverInput>
  }

  export type GameInvitationUpdateManyWithWhereWithoutReceiverInput = {
    where: GameInvitationScalarWhereInput
    data: XOR<GameInvitationUpdateManyMutationInput, GameInvitationUncheckedUpdateManyWithoutReceiverInput>
  }

  export type GameUpsertWithWhereUniqueWithoutOwnerInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutOwnerInput, GameUncheckedUpdateWithoutOwnerInput>
    create: XOR<GameCreateWithoutOwnerInput, GameUncheckedCreateWithoutOwnerInput>
  }

  export type GameUpdateWithWhereUniqueWithoutOwnerInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutOwnerInput, GameUncheckedUpdateWithoutOwnerInput>
  }

  export type GameUpdateManyWithWhereWithoutOwnerInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutOwnerInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    status?: StringFilter<"Game"> | string
    name?: StringFilter<"Game"> | string
    winnerId?: StringNullableFilter<"Game"> | string | null
    maxPlayers?: IntFilter<"Game"> | number
    minPlayers?: IntFilter<"Game"> | number
    turnTimeout?: IntNullableFilter<"Game"> | number | null
    password?: StringNullableFilter<"Game"> | string | null
    ownerId?: StringFilter<"Game"> | string
    currentTurnId?: StringNullableFilter<"Game"> | string | null
    diceValues?: IntNullableListFilter<"Game">
    rollCount?: IntFilter<"Game"> | number
  }

  export type UserCreateWithoutFriendshipsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutFriendshipsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutFriendshipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendshipsInput, UserUncheckedCreateWithoutFriendshipsInput>
  }

  export type UserCreateWithoutFriendOfInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutFriendOfInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutFriendOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
  }

  export type UserUpsertWithoutFriendshipsInput = {
    update: XOR<UserUpdateWithoutFriendshipsInput, UserUncheckedUpdateWithoutFriendshipsInput>
    create: XOR<UserCreateWithoutFriendshipsInput, UserUncheckedCreateWithoutFriendshipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendshipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendshipsInput, UserUncheckedUpdateWithoutFriendshipsInput>
  }

  export type UserUpdateWithoutFriendshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserUpsertWithoutFriendOfInput = {
    update: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
    create: XOR<UserCreateWithoutFriendOfInput, UserUncheckedCreateWithoutFriendOfInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendOfInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendOfInput, UserUncheckedUpdateWithoutFriendOfInput>
  }

  export type UserUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutStatsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutStatsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
  }

  export type UserUpsertWithoutStatsInput = {
    update: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type GameUserCreateWithoutGameInput = {
    id?: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
    user: UserCreateNestedOneWithoutGamesInput
  }

  export type GameUserUncheckedCreateWithoutGameInput = {
    id?: string
    userId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type GameUserCreateOrConnectWithoutGameInput = {
    where: GameUserWhereUniqueInput
    create: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput>
  }

  export type GameUserCreateManyGameInputEnvelope = {
    data: GameUserCreateManyGameInput | GameUserCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutOwnedGamesInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutOwnedGamesInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutOwnedGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedGamesInput, UserUncheckedCreateWithoutOwnedGamesInput>
  }

  export type GameInvitationCreateWithoutGameInput = {
    id?: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentInvitationsInput
    receiver: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type GameInvitationUncheckedCreateWithoutGameInput = {
    id?: string
    senderId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameInvitationCreateOrConnectWithoutGameInput = {
    where: GameInvitationWhereUniqueInput
    create: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput>
  }

  export type GameInvitationCreateManyGameInputEnvelope = {
    data: GameInvitationCreateManyGameInput | GameInvitationCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GameUserUpsertWithWhereUniqueWithoutGameInput = {
    where: GameUserWhereUniqueInput
    update: XOR<GameUserUpdateWithoutGameInput, GameUserUncheckedUpdateWithoutGameInput>
    create: XOR<GameUserCreateWithoutGameInput, GameUserUncheckedCreateWithoutGameInput>
  }

  export type GameUserUpdateWithWhereUniqueWithoutGameInput = {
    where: GameUserWhereUniqueInput
    data: XOR<GameUserUpdateWithoutGameInput, GameUserUncheckedUpdateWithoutGameInput>
  }

  export type GameUserUpdateManyWithWhereWithoutGameInput = {
    where: GameUserScalarWhereInput
    data: XOR<GameUserUpdateManyMutationInput, GameUserUncheckedUpdateManyWithoutGameInput>
  }

  export type UserUpsertWithoutOwnedGamesInput = {
    update: XOR<UserUpdateWithoutOwnedGamesInput, UserUncheckedUpdateWithoutOwnedGamesInput>
    create: XOR<UserCreateWithoutOwnedGamesInput, UserUncheckedCreateWithoutOwnedGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedGamesInput, UserUncheckedUpdateWithoutOwnedGamesInput>
  }

  export type UserUpdateWithoutOwnedGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type GameInvitationUpsertWithWhereUniqueWithoutGameInput = {
    where: GameInvitationWhereUniqueInput
    update: XOR<GameInvitationUpdateWithoutGameInput, GameInvitationUncheckedUpdateWithoutGameInput>
    create: XOR<GameInvitationCreateWithoutGameInput, GameInvitationUncheckedCreateWithoutGameInput>
  }

  export type GameInvitationUpdateWithWhereUniqueWithoutGameInput = {
    where: GameInvitationWhereUniqueInput
    data: XOR<GameInvitationUpdateWithoutGameInput, GameInvitationUncheckedUpdateWithoutGameInput>
  }

  export type GameInvitationUpdateManyWithWhereWithoutGameInput = {
    where: GameInvitationScalarWhereInput
    data: XOR<GameInvitationUpdateManyMutationInput, GameInvitationUncheckedUpdateManyWithoutGameInput>
  }

  export type UserCreateWithoutGamesInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutGamesInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
  }

  export type GameCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    owner: UserCreateNestedOneWithoutOwnedGamesInput
    invitations?: GameInvitationCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    ownerId: string
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    invitations?: GameInvitationUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutPlayersInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
  }

  export type UserUpsertWithoutGamesInput = {
    update: XOR<UserUpdateWithoutGamesInput, UserUncheckedUpdateWithoutGamesInput>
    create: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesInput, UserUncheckedUpdateWithoutGamesInput>
  }

  export type UserUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type GameUpsertWithoutPlayersInput = {
    update: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPlayersInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutOwnedGamesNestedInput
    invitations?: GameInvitationUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    invitations?: GameInvitationUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateWithoutInvitationsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserCreateNestedManyWithoutGameInput
    owner: UserCreateNestedOneWithoutOwnedGamesInput
  }

  export type GameUncheckedCreateWithoutInvitationsInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    ownerId: string
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
    players?: GameUserUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutInvitationsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutInvitationsInput, GameUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutSentInvitationsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    receivedInvitations?: GameInvitationCreateNestedManyWithoutReceiverInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutSentInvitationsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    receivedInvitations?: GameInvitationUncheckedCreateNestedManyWithoutReceiverInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutSentInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
  }

  export type UserCreateWithoutReceivedInvitationsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsCreateNestedOneWithoutUserInput
    games?: GameUserCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationCreateNestedManyWithoutSenderInput
    ownedGames?: GameCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutReceivedInvitationsInput = {
    id?: string
    googleId: string
    name: string
    email: string
    password?: string | null
    image?: string | null
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    games?: GameUserUncheckedCreateNestedManyWithoutUserInput
    friendships?: UserFriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendOf?: UserFriendshipUncheckedCreateNestedManyWithoutReceiverInput
    sentInvitations?: GameInvitationUncheckedCreateNestedManyWithoutSenderInput
    ownedGames?: GameUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutReceivedInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
  }

  export type GameUpsertWithoutInvitationsInput = {
    update: XOR<GameUpdateWithoutInvitationsInput, GameUncheckedUpdateWithoutInvitationsInput>
    create: XOR<GameCreateWithoutInvitationsInput, GameUncheckedCreateWithoutInvitationsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutInvitationsInput, GameUncheckedUpdateWithoutInvitationsInput>
  }

  export type GameUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUpdateManyWithoutGameNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutSentInvitationsInput = {
    update: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    receivedInvitations?: GameInvitationUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    receivedInvitations?: GameInvitationUncheckedUpdateManyWithoutReceiverNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserUpsertWithoutReceivedInvitationsInput = {
    update: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type UserUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    games?: GameUserUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUpdateManyWithoutSenderNestedInput
    ownedGames?: GameUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    games?: GameUserUncheckedUpdateManyWithoutUserNestedInput
    friendships?: UserFriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendOf?: UserFriendshipUncheckedUpdateManyWithoutReceiverNestedInput
    sentInvitations?: GameInvitationUncheckedUpdateManyWithoutSenderNestedInput
    ownedGames?: GameUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type GameUserCreateManyUserInput = {
    id?: string
    gameId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type UserFriendshipCreateManyRequesterInput = {
    id?: string
    receiverId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFriendshipCreateManyReceiverInput = {
    id?: string
    requesterId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameInvitationCreateManySenderInput = {
    id?: string
    gameId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameInvitationCreateManyReceiverInput = {
    id?: string
    gameId: string
    senderId: string
    createdAt?: Date | string
  }

  export type GameCreateManyOwnerInput = {
    id?: string
    createdAt?: Date | string
    status: string
    name: string
    winnerId?: string | null
    maxPlayers?: number
    minPlayers?: number
    turnTimeout?: number | null
    password?: string | null
    currentTurnId?: string | null
    diceValues?: GameCreatediceValuesInput | number[]
    rollCount?: number
  }

  export type GameUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GameUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserFriendshipUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutFriendOfNestedInput
  }

  export type UserFriendshipUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFriendshipUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFriendshipUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneRequiredWithoutFriendshipsNestedInput
  }

  export type UserFriendshipUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFriendshipUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutInvitationsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
  }

  export type GameInvitationUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutInvitationsNestedInput
    sender?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
  }

  export type GameInvitationUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUpdateManyWithoutGameNestedInput
    invitations?: GameInvitationUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
    players?: GameUserUncheckedUpdateManyWithoutGameNestedInput
    invitations?: GameInvitationUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    maxPlayers?: IntFieldUpdateOperationsInput | number
    minPlayers?: IntFieldUpdateOperationsInput | number
    turnTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    currentTurnId?: NullableStringFieldUpdateOperationsInput | string | null
    diceValues?: GameUpdatediceValuesInput | number[]
    rollCount?: IntFieldUpdateOperationsInput | number
  }

  export type GameUserCreateManyGameInput = {
    id?: string
    userId: string
    ones?: number | null
    twos?: number | null
    threes?: number | null
    fours?: number | null
    fives?: number | null
    sixes?: number | null
    straight?: number | null
    fullHouse?: number | null
    poker?: number | null
    generala?: number | null
    double?: number | null
    totalScore?: number | null
  }

  export type GameInvitationCreateManyGameInput = {
    id?: string
    senderId: string
    receiverId: string
    createdAt?: Date | string
  }

  export type GameUserUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GameUserUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameUserUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ones?: NullableIntFieldUpdateOperationsInput | number | null
    twos?: NullableIntFieldUpdateOperationsInput | number | null
    threes?: NullableIntFieldUpdateOperationsInput | number | null
    fours?: NullableIntFieldUpdateOperationsInput | number | null
    fives?: NullableIntFieldUpdateOperationsInput | number | null
    sixes?: NullableIntFieldUpdateOperationsInput | number | null
    straight?: NullableIntFieldUpdateOperationsInput | number | null
    fullHouse?: NullableIntFieldUpdateOperationsInput | number | null
    poker?: NullableIntFieldUpdateOperationsInput | number | null
    generala?: NullableIntFieldUpdateOperationsInput | number | null
    double?: NullableIntFieldUpdateOperationsInput | number | null
    totalScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GameInvitationUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
  }

  export type GameInvitationUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameInvitationUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}