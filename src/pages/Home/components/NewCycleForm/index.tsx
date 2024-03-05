import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";

import { useContext } from "react";
import { CyclesContext } from "../../Home";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()
    
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                type="text" 
                id="task" 
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                {...register('task')}
                disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
                <option value="projeto 1" />
                <option value="projeto 2" />
                <option value="projeto 3" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number"   
                id="minutesAmount" 
                step={5}
                min={1}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
                disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}