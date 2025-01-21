import {defineStore} from "pinia";

export const useMermaidDiagramStore =  defineStore('mermaid-diagram', () => {

    const diagrams = ref<Map<string, string>>(new Map<string, string>());

    const addDiagram = (id: number, diagram: string) => {
        if (diagrams.value.has(`${useRoute().path}:${id}`)) {
            return;
        }
        diagrams.value.set(`${useRoute().path}:${id}`, diagram);
    }

    const getDiagram = (id: number) => {
        return diagrams.value.get(`${useRoute().path}:${id}`);
    }

    return {
        addDiagram,
        getDiagram
    }
});