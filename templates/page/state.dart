import 'package:flying_redux/flying_redux.dart';
import './sub_component/state.dart';

class $nameState implements Cloneable<$nameState> {
  List<SubState> toDos = [];

  @override
  $nameState clone() {
    return $nameState()..toDos = toDos;
  }
}

$nameState initState(Map<String, dynamic>? args) {
  return $nameState()..toDos = [];
}
