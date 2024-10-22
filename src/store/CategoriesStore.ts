import {defineStore} from "pinia";
import type ICategoryNode from "@/classes/ICategoryNode";
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import CategoryGroup from "@/classes/implement/CategoryGroup";
import CategoryContent from "@/classes/implement/CategoryContent";
import {ref} from "@vue/reactivity";

export const useCategoriesStore = defineStore('Categories', () => {

    const categories = ref<Array<ICategoryNode>>(new Array<ICategoryNode>());

    function initialize(posts: Array<PostMetadata>): void {
        posts.forEach(post => {
            const foundGroup = findOrCreateGroup(categories.value, post.header.categories, 0);
            foundGroup.addChild(new CategoryContent(false, post.header.title, post.path))
        });
    }

    function findOrCreateGroup(existingGroups: Array<ICategoryNode>, newGroups: Array<string>, depth: number): CategoryGroup {
        const currentGroup = newGroups[depth];
        const found = existingGroups.find(exist => exist.isDirectory && exist.name === currentGroup);
        //존재하지 않는 경우 생성
        if (!found) {
            const newGroup = new CategoryGroup(true, currentGroup, false);
            existingGroups.push(newGroup);
            if (newGroups.length -1 === depth) {
                return newGroup;
            }
            return findOrCreateGroup(newGroup.children, newGroups, depth +1);
        }

        const exist = found as CategoryGroup;
        //마지막 인덱스인경우 찾았으므로 처리
        if (newGroups.length -1 === depth) {
            return exist;
        }

        return findOrCreateGroup(exist.children, newGroups, depth +1);
    }

    return {
        categories,
        initialize
    }
});
