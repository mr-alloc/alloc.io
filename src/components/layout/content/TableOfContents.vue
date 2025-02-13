<template>
  <ul class="space-y-1 hidden lg:block">
    <li v-for="(child, index) in props.headline.children" :key="child.fragment" class="space-y-1 hidden lg:block" :class="{
       'ml-3': props.isInner
    }">
      <a class="block text-sm/6 truncate" :href="`#${child.fragment}`"
         :class="scrollspy.activeHeadings.includes(child.fragment) ? config.active : config.inactive"
         @click.prevent="scrollToHeading(child.fragment)"> {{ child.title }}</a>
      <TableOfContents  v-if="props.headline.children.length > 0" :headline="props.headline.children[index]" :is-inner="true" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import TocNode from "@/classes/implement/toc-node";
import {useScrollspy} from "@/store/scroll-spy";
import mermaid from "mermaid";
import {useCodeGroupStore} from "@/store/code-group-store";
import {usePhotoViewStatusStore} from "@/store/photo-view-store";
import {usePagePrepareStore} from "@/store/prepare-post-store";
import {useMermaidDiagramStore} from "@/store/mermaid-diagram-store";

const router = useRouter();
const scrollspy = useScrollspy();
const nuxtApp = useNuxtApp();
const codeGroupStore = useCodeGroupStore();
const prepareStore = usePagePrepareStore();
const photoViewStore = usePhotoViewStatusStore();
const mermaidStore = useMermaidDiagramStore();
const props = defineProps<{
  headline: TocNode,
  isInner: boolean,
}>();
const config = {
  wrapper: 'space-y-1',
  base: 'block text-sm/6 truncate',
  active: 'text-primary',
  inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 duration-300',
  depth: 'ml-3'
}

const emit = defineEmits(['move']);
const scrollToHeading = (id: string) => {
  router.push(`#${id}`)
  emit('move', id);
};

const unescapeHtml = (html: string): string => {
  return html
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'");
}

nuxtApp.hooks.hookOnce('page:finish', () => {
  if (prepareStore.isPrepare) {
    //toc
    scrollspy.updateHeadings(props.headline, [
      ...document.querySelectorAll('h2'),
      ...document.querySelectorAll('h3')
    ]);

    //photo view
    document.querySelectorAll('.rendered-markdown-wrapper img').forEach((imgTag, index) => {
      imgTag.addEventListener('click', (e) => {
        photoViewStore.open(index + 1)
      });
    });

    //code-group
    const activateClasses = 'bg-gray-100 dark:bg-gray-800'.split(' ');
    const deactivateClasses = 'hover:bg-gray-50 dark:hover:bg-gray-800/50'.split(' ');

    document.querySelectorAll('.code-group').forEach((codeWrapper) => {
      const groupNumber = (codeWrapper as HTMLElement).dataset.groupNumber;
      const buttons = document.querySelectorAll(`.${codeWrapper.id}-buttons button`);
      buttons.forEach((element) => {
        const button = element as HTMLButtonElement;

        button.addEventListener('click', () => {
          const codeContent = codeWrapper.querySelector('.code-content') as HTMLPreElement;
          codeContent.outerHTML = codeGroupStore.getCodeGroup(groupNumber!, button.innerText);

          //기존 버튼들 버튼 비활성화
          buttons.forEach((other) => {
            const otherButton = other as HTMLButtonElement;
            otherButton.classList.remove(...activateClasses, ...deactivateClasses);

            if (otherButton.innerText === button.innerText) {
              otherButton.classList.add(...activateClasses);
            } else {
              otherButton.classList.add(...deactivateClasses);
            }
          });
        });
      });
    });
    //mermaid
    document.querySelectorAll('pre.mermaid')
        .forEach(async (element: Element) => {
          const html = element as HTMLElement;
          const mermaidId = html.dataset['mermaidId'];

          if (!mermaidId) {
            return;
          }
          const id = parseInt(mermaidId);
          const code = mermaidStore.getDiagram(id)!;

          const { svg } = await mermaid.render(`mermaid-${mermaidId}`, code);

          element.innerHTML = svg;
        });


    //copy button
    const buttons = [...document.querySelectorAll('.copy-button').values()];
    buttons.forEach((button) => {
      const div = button.parentNode!;

      button.addEventListener('click', () => {
        button.innerHTML = '<span class="iconify i-ph:green-circle-check flex-shrink-0 h-4 w-4" aria-hidden="true"></span>';

        setTimeout(async () => {
          const htmlPreElement = div.querySelector('pre')!;
          await navigator.clipboard.writeText(htmlPreElement.innerText);

          setTimeout(() => {
            //revert icon to copy
            button.innerHTML = '<span class="iconify i-ph:copy flex-shrink-0 h-4 w-4" aria-hidden="true"></span>'
          }, 2000)
        });

      });
    });

    prepareStore.done();
  }
});
</script>

<style lang="scss" scoped>
.outline-link {
  color: #3c3c3cb3;
  transition: color .25s;

  &:hover, :active {
    color: #213547;
  }
}

ul {
  list-style: none;
  padding-left: 1em;

  li {
    color: var(--vt-c-text-2);
    transition: color .5s;
    line-height: 28px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
  }
}

</style>
