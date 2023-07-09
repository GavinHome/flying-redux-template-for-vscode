import 'package:flying_redux/flying_redux.dart';

import 'action.dart';
import 'state.dart';
import './sub_component/state.dart';

buildReducer() {
  return asReducer(
    <Object, Reducer<$nameState>>{
      $nameAction.initAction: _initAction,
      $nameAction.someAction: _someAction,
    },
  );
}

$nameState _initAction($nameState state, Action action) {
  final List<SubState> toDos = action.payload ?? <SubState>[];
  final $nameState newState = state.clone();
  newState.toDos = toDos;
  return newState;
}


$nameState _someAction($nameState state, Action action) {
  final $nameState newState = state.clone();
  return newState;
}
