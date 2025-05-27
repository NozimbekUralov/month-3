export interface ConditionEntity extends CreateCondition {
    id: number;
}

export interface CreateCondition {
    month: number;
    percent: number;
    agreement: string;
}

export interface UpdateCondition extends Partial<CreateCondition> { }