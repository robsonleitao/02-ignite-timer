import { Cycle } from "../../contexts/CyclesContext";

export enum ActionType {
    add_new_cycle = 'add_new_cycle',
    interrupt_current_cycle = 'interrupt_current_cycle',
    mark_current_cycle_as_fineshed = 'mark_current_cycle_as_fineshed'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionType.add_new_cycle,
        payload: {
            newCycle
        }
    }
}

export function markCurrentCycleAsFineshedAction() {
    return {
        type: ActionType.mark_current_cycle_as_fineshed
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionType.interrupt_current_cycle
    }
}