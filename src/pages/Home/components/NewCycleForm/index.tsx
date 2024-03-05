import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from "react-hook-form";

export function NewCycleForm() {
    // validando os inputs do formuláro utilizando o zod
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod
        .number()
        .min(1, 'o valor mínimo é 5')
        .max(60, 'o valor máximo é 60')
    })

    const {register, handleSubmit, watch, reset} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

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