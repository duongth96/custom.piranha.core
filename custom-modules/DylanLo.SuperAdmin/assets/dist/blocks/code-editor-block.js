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
            isExpanded: false
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
            return this.model.code.value && (
                (this.model.code.value.html && this.model.code.value.html.length > 0) ||
                (this.model.code.value.css && this.model.code.value.css.length > 0) ||
                (this.model.code.value.js && this.model.code.value.js.length > 0)
            );
        },
        
        /**
         * Gets a summary of the code content
         */
        codeSummary: function () {
            const parts = [];
            
            if (this.model.code.value.html && this.model.code.value.html.length > 0) {
                parts.push("HTML");
            }
            
            if (this.model.code.value.css && this.model.code.value.css.length > 0) {
                parts.push("CSS");
            }
            
            if (this.model.code.value.js && this.model.code.value.js.length > 0) {
                parts.push("JS");
            }
            
            return parts.join(", ");
        }
    },
    template: `
        <div class="block-body">
            <div class="card">
                <div class="card-header">
                    <div class="title-header">
                        <div>
                            <h3 class="card-title">
                                <i class="fas fa-code"></i>
                                <span v-if="hasTitle">{{ model.title.value }}</span>
                                <span v-else>Code Editor</span>
                            </h3>
                            <p v-if="hasDescription" class="card-subtitle text-muted">{{ model.description.value }}</p>
                        </div>
                        <div>
                            <button v-if="hasCode" class="btn btn-sm" :class="{ 'btn-primary': isExpanded, 'btn-light': !isExpanded }" @click.prevent="toggleExpand">
                                <i :class="{ 'fas fa-compress-alt': isExpanded, 'fas fa-expand-alt': !isExpanded }"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="model.title.value" class="form-control" placeholder="Enter a title for this code snippet">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea v-model="model.description.value" class="form-control" rows="2" placeholder="Enter a description for this code snippet"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input :id="uid + '-render'" type="checkbox" class="custom-control-input" v-model="model.renderDirectly.value" @change="toggleRender">
                            <label class="custom-control-label" :for="uid + '-render'">Render code directly when page is displayed</label>
                        </div>
                    </div>
                    <div class="code-editor-wrapper" :class="{ 'expanded': isExpanded }">
                        <code-editor-field :uid="uid + '-code'" :model="model.code" :meta="{ notifyChange: false }"></code-editor-field>
                    </div>
                </div>
                <div v-if="hasCode" class="card-footer text-muted">
                    <small>
                        <i class="fas fa-code"></i> {{ codeSummary }}
                    </small>
                </div>
            </div>
        </div>
    `
});