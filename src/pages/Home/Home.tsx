import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

export function Home() {
    const {register, handleSubmit, watch} = useForm()
    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: any) {
        console.log(data)
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="projeto 222" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        step={5}
                        min={0}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}