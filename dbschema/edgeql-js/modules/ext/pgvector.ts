// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../../reflection";
import * as _ from "../../imports";
import type * as _cfg from "../cfg";
import type * as _std from "../std";
export type $vector = $.ScalarType<"ext::pgvector::vector", Float32Array, Float32Array | number[]>;
const vector: $.scalarTypeWithConstructor<$vector, number[]> = $.makeType<$.scalarTypeWithConstructor<$vector, number[]>>(_.spec, "9565dd88-04f5-11ee-a691-0b6ebe179825", _.syntax.literal);

export type $ConfigλShape = $.typeutil.flatten<_cfg.$ExtensionConfigλShape & {
  "probes": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, true>;
  "ef_search": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, true>;
}>;
type $Config = $.ObjectType<"ext::pgvector::Config", $ConfigλShape, null, [
  ..._cfg.$ExtensionConfig['__exclusives__'],
]>;
const $Config = $.makeType<$Config>(_.spec, "1d09ac5f-649a-5c54-b0ed-eb5eb9b819dc", _.syntax.literal);

const Config: $.$expr_PathNode<$.TypeSet<$Config, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Config, $.Cardinality.Many), null);

type neg_inner_productλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
> = $.$expr_Function<
  _std.$number, $.cardutil.multiplyCardinalities<$.cardutil.paramCardinality<P1>, $.cardutil.paramCardinality<P2>>
>;
function neg_inner_product<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
>(
  a: P1,
  b: P2,
): neg_inner_productλFuncExpr<P1, P2>;
function neg_inner_product(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('ext::pgvector::neg_inner_product', args, _.spec, [
    {args: [{typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}, {typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "ext::pgvector::neg_inner_product",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type cosine_distanceλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
> = $.$expr_Function<
  _std.$number, $.cardutil.multiplyCardinalities<$.cardutil.paramCardinality<P1>, $.cardutil.paramCardinality<P2>>
>;
function cosine_distance<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
>(
  a: P1,
  b: P2,
): cosine_distanceλFuncExpr<P1, P2>;
function cosine_distance(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('ext::pgvector::cosine_distance', args, _.spec, [
    {args: [{typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}, {typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "ext::pgvector::cosine_distance",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type euclidean_normλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
> = $.$expr_Function<
  _std.$number, $.cardutil.paramCardinality<P1>
>;
function euclidean_norm<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
>(
  a: P1,
): euclidean_normλFuncExpr<P1>;
function euclidean_norm(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('ext::pgvector::euclidean_norm', args, _.spec, [
    {args: [{typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "ext::pgvector::euclidean_norm",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type set_probesλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$number>>,
> = $.$expr_Function<
  _std.$number, $.cardutil.paramCardinality<P1>
>;
function set_probes<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$number>>,
>(
  num: P1,
): set_probesλFuncExpr<P1>;
function set_probes(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('ext::pgvector::set_probes', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "ext::pgvector::set_probes",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type euclidean_distanceλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
> = $.$expr_Function<
  _std.$number, $.cardutil.multiplyCardinalities<$.cardutil.paramCardinality<P1>, $.cardutil.paramCardinality<P2>>
>;
function euclidean_distance<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<$vector>>,
>(
  a: P1,
  b: P2,
): euclidean_distanceλFuncExpr<P1, P2>;
function euclidean_distance(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('ext::pgvector::euclidean_distance', args, _.spec, [
    {args: [{typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}, {typeId: "9565dd88-04f5-11ee-a691-0b6ebe179825", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "ext::pgvector::euclidean_distance",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { vector, $Config, Config };

type __defaultExports = {
  "vector": typeof vector;
  "Config": typeof Config;
  "neg_inner_product": typeof neg_inner_product;
  "cosine_distance": typeof cosine_distance;
  "euclidean_norm": typeof euclidean_norm;
  "set_probes": typeof set_probes;
  "euclidean_distance": typeof euclidean_distance
};
const __defaultExports: __defaultExports = {
  "vector": vector,
  "Config": Config,
  "neg_inner_product": neg_inner_product,
  "cosine_distance": cosine_distance,
  "euclidean_norm": euclidean_norm,
  "set_probes": set_probes,
  "euclidean_distance": euclidean_distance
};
export default __defaultExports;
