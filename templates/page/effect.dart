import 'package:flutter/material.dart' hide Action, Page;
import 'package:flying_redux/flying_redux.dart';

import 'action.dart';
import 'state.dart';
import './sub_component/state.dart';

buildEffects() {
  return combineEffects<$nameState>(<Object, Effect<$nameState>>{
    Lifecycle.initState: _onInit,
    $nameAction.onSomeAction: _onSomeAction,
  });
}


void _onInit(Action action, ComponentContext<$nameState> ctx) {
  final List<SubState> initData = <SubState>[];
  //do something
  initData.add(SubState()..uniqueId="1");
  initData.add(SubState()..uniqueId="2");
  ctx.dispatch($nameActionCreator.initAction(initData));
}

void _onSomeAction(Action action, ComponentContext<$nameState> ctx) {
  Navigator.of(ctx.context)
      .pushNamed('some_route_name', arguments: null)
      .then((dynamic toDo) {
    if (toDo != null) {
      ctx.dispatch($nameActionCreator.someAction(toDo));
    }
  });
}
