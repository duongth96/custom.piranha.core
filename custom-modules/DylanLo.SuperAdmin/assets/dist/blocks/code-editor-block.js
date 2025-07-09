/*global
    piranha
*/

/**
 * Code Editor Block Component
 * 
 * A Vue component that provides a block interface for the code editor field,
 * allowing users to add HTML, CSS, and JavaScript code snippets to their content.
 */
Vue.component("code-editor-block", {
    props: ["uid", "model", "toolbar"],
    data: function () {
        return {
            isExpanded: false,
            selectedLanguage: 'html' // Default language
        };
    },
    methods: {
        /**
         * Toggles the expanded state of the block
         */
        toggleExpand: function () {
            this.isExpanded = !this.isExpanded;
        },
        
        /**
         * Toggles the render directly checkbox
         */
        toggleRender: function () {
            this.model.renderDirectly.value = !this.model.renderDirectly.value;
        },

        /**
         * Changes the selected language
         */
        changeLanguage: function(lang) {
            this.selectedLanguage = lang.toLowerCase();
        }
    },
    computed: {
        /**
         * Checks if the block has a title
         */
        hasTitle: function () {
            return this.model.title.value && this.model.title.value.length > 0;
        },
        
        /**
         * Checks if the block has a description
         */
        hasDescription: function () {
            return this.model.description.value && this.model.description.value.length > 0;
        },
        
        /**
         * Checks if the code editor has any content
         */
        hasCode: function () {
            return this.model.code.value && this.model.code.value.length > 0;
        },
        
        /**
         * Gets a summary of the code content
         */
        codeSummary: function () {
            return this.model.code.value ? "Code" : "";
        }
    },
    template: `
        <div class="block-body">
            <div class="block-header">
                <div class="title">
                    <i class="fas fa-code"></i>
                    <strong v-if="hasTitle">{{ model.title.value }}</strong>
                    <strong v-else>Code Editor</strong>
                </div>
                <div class="actions">
                    <button v-on:click="toggleExpand" class="btn btn-sm">
                        <i v-if="isExpanded" class="fas fa-chevron-up"></i>
                        <i v-else class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="block-content" v-bind:class="{ expanded: isExpanded }">
                <div class="form-group" v-if="toolbar">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="model.renderDirectly.value" v-on:change="toggleRender">
                        <label class="form-check-label">Render directly</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input v-model="model.title.value" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="model.description.value" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <div class="btn-group mb-3">
                        <button 
                            v-for="lang in ['HTML', 'CSS', 'JavaScript']" 
                            :key="lang"
                            class="btn btn-sm" 
                            :class="{'btn-primary': selectedLanguage === lang.toLowerCase(), 'btn-outline-primary': selectedLanguage !== lang.toLowerCase()}"
                            @click="changeLanguage(lang)"
                        >
                            {{ lang }}
                        </button>
                    </div>
                    <code-editor-field 
                        v-model="model.code.value"
                        :label="'Code'"
                        :language="selectedLanguage"
                    ></code-editor-field>
                </div>
            </div>
        </div>
    `
});