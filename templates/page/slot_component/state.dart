import 'package:flying_redux/flying_redux.dart';

class SlotState implements Cloneable<SlotState> {
  int total;

  SlotState({this.total = 0});

  @override
  SlotState clone() {
    return SlotState()
      ..total = total;
  }

  @override
  String toString() {
    return 'SlotState{total: $total}';
  }
}
