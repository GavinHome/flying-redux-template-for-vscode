import 'package:flying_redux/flying_redux.dart';
import 'state.dart';
import './sub_component/state.dart';
import './sub_component/component.dart';
import './slot_component/state.dart';

BasicAdapter<$nameState> get adapter => BasicAdapter(
    builder: ($nameState state) => state.toDos
        .asMap()
        .keys
        .map((index) =>
            AdapterConnector(toDos: state.toDos, index: index) + SubComponent())
        .toList());

class AdapterConnector extends ConnOp<$nameState, SubState> {
  AdapterConnector({required this.toDos, required this.index}) : super();

  final List<SubState> toDos;
  final int index;

  @override
  SubState get($nameState state) {
    return toDos[index];
  }

  @override
  void set($nameState state, SubState subState) {
    state.toDos[index] = subState;
  }
}

class SlotConnector extends ConnOp<$nameState, SlotState> {
  @override
  SlotState get($nameState state) {
    return SlotState()
      ..total = state.toDos.length;
  }

  @override
  void set($nameState state, SlotState subState) {}
}
