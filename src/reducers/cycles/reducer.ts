import { Cycle } from "../../contexts/CyclesContext"
import { ActionType } from "./actions"

interface CycleState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {

    switch(action.type) {
        case ActionType.add_new_cycle:
            return {
                ...state, 
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
            }

        case ActionType.interrupt_current_cycle:
            return {
                ...state,
                activeCycleId: null,
                cycles: state.cycles.map(cycle => {
                    if(cycle.id == state.activeCycleId) {
                        return {...cycle, interruptDate: new Date()}
                    }else {
                        return cycle
                    }
                })
            }

        case ActionType.mark_current_cycle_as_fineshed:
            return {
                ...state,
                activeCycleId: null,
                cycles: state.cycles.map(cycle => {
                    if(cycle.id == state.activeCycleId) {
                        return {...cycle, fineshedDate: new Date()}
                    }else {
                        return cycle
                    }
                })
            }
        default:
            state
    }

    return state
}