import 'package:flying_redux/flying_redux.dart';
import 'package:flutter/material.dart' hide Page, Action;

import 'action.dart';
import 'adapter.dart';
import 'effect.dart';
import 'reducer.dart';
import 'state.dart';

import './sub_component/component.dart';
import './sub_component/state.dart';
import './slot_component/component.dart';

class $namePage extends Page<$nameState, Map<String, dynamic>> {
  $namePage()
      : super(
            initState: initState,
            effect: buildEffects(),
            reducer: buildReducer(),
            dependencies: Dependencies<$nameState>(
                adapter: const NoneConn<$nameState>() + adapter,
                slots: <String, Dependent<$nameState>>{
                  'sub': SlotConnector() + SlotComponent(),
                }),
            middleware: <Middleware<$nameState>>[
              logMiddleware<$nameState>(
                  tag: '$nameState',
                  monitor: ($nameState? state) {
                    return state == null ? '' : state.toString();
                  })
            ],
            view: ($nameState state, Dispatch dispatch,
              ComponentContext<$nameState> ctx) {
            final List<Widget> ws = ctx.buildComponents();
            return Scaffold(
              body: Stack(children: <Widget>[
                ListView.builder(
                  itemBuilder: (BuildContext context, int index) => ws[index],
                  itemCount: ws.length,
                ),
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: ctx.buildComponent('sub'),
                )
              ]),
              floatingActionButton: FloatingActionButton(
                onPressed: () => dispatch($nameActionCreator.onSomeAction()),
                tooltip: 'some',
                child: const Icon(Icons.add),
              ),
            );
          },
            
            );

}