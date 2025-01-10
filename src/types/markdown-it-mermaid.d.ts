declare module 'md-it-mermaid' {
    import MarkdownIt from 'markdown-it';

    interface MermaidOptions {
        mermaid?: {
            theme?: 'default' | 'forest' | 'dark' | 'neutral';
            startOnLoad?: boolean;
            securityLevel?: 'strict' | 'loose' | 'antiscript';
        };
    }

    const mermaidPlugin: MarkdownIt.PluginWithOptions<MermaidOptions>;
    export default mermaidPlugin;
}