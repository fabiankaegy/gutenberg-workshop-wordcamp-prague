import { 
    registerBlockType,
    registerBlockStyle
} from '@wordpress/blocks';
import { 
    BlockControls,
    MediaUpload,
    MediaPlaceholder,
    RichText,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { 
    Toolbar, 
    ToolbarButton,
} from '@wordpress/components';

registerBlockType( 
    'wordcampprague/cardblock',
    {
        title: 'Card Block',
        icon: 'id-alt',
        category: 'common',
        attributes: {
            title: {
                type: 'string'
            },
            image: {
                type: 'object',
            },
            backgroundColor: {
                type: 'string',
            },
            textColor: {
                type: 'string',
            }
        },
        example: {
            attributes: {
                title: "My Cool Example",
                image: {
                    url: 'https://images.unsplash.com/photo-1528807441784-e1f1a5c6f0a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80'
                },
            }
        },
        styles: [
            {
                name: 'default',
                label: 'Rounded',
                isDefault: true
            },
            {
                name: 'outline',
                label: 'Outline'
            },
        ],
        edit: (props) => {

            const { 
                className, 
                setAttributes, 
                attributes: { 
                    title,
                    image,
                    backgroundColor,
                    textColor
                } 
            } = props;

            const onSelectImage = (newImage) => setAttributes( { image: newImage } );

            return (
                <>
                    { image && image.url ?
                        <BlockControls>
                            <Toolbar>
                                <MediaUpload 
                                    allowedTypes={ [ 'image' ] }
                                    multiple={ false }
                                    render={ ({open}) => (
                                        <ToolbarButton onClick={open} icon="edit"/>
                                    ) }
                                    onSelect={ onSelectImage }
                                />
                            </Toolbar>
                        </BlockControls>:
                        null
                    }
                    <InspectorControls>
                        <PanelColorSettings
                            title="Color Settings"
                            colorSettings={ [
                                {
                                    label: "Background Color",
                                    value: backgroundColor,
                                    onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } )
                                },
                                {
                                    label: "Text Color",
                                    value: textColor,
                                    onChange: ( newColor ) => setAttributes( { textColor: newColor } )
                                }
                            ] }
                        />
                    </InspectorControls>
                    <div 
                        className={ className }
                        style={ {
                            backgroundColor: backgroundColor,
                            color: textColor
                        } }
                    >
                        <div className="card-header">
                            <RichText 
                                tagName="h3"
                                value={ title }
                                placeholder="My Placehoder Text"
                                onChange={ ( newValue ) => setAttributes( {
                                    title: newValue
                                } ) }
                            />
                        </div>
                        <div className="card-media">
                            { image && image.url ?
                                <img src={ image.url } alt={image.alt} />
                                : (
                                    <MediaPlaceholder 
                                        allowedTypes={ [ 'image' ] }
                                        multiple={ false }
                                        labels={ { title: "Card Image" } }
                                        onSelect={ onSelectImage }
                                    />
                                )
                            }
                        </div>
                        <div className="card-body">
                            <InnerBlocks 
                                template={ [ 
                                    ['core/heading', { placeholder: 'Your Headline ...' }],
                                    [ 'core/paragraph', { placeholder: 'Your Text ...' } ],
                                ] }
                                //templateLock={ true }
                                allowedBlocks={ 
                                    [
                                        'core/heading',
                                        'core/paragraph',
                                        'core/button',
                                        'core/list',
                                        'core/quote',
                                        'core/separator'
                                    ]
                                }
                            />
                        </div>
                        <a href="#" class="stretched-link"></a>
                    </div>
                </>
            );
        },
        save: (props) => {

            const { 
                className, 
                attributes: { 
                    title, 
                    image 
                } 
            } = props;

            return ( 
                <div className={ className }>
                    <div className="card-header">
                        <RichText.Content tagName="h3" value={title} />
                    </div>
                    <div className="card-media">
                        <img src={ image.url } alt={image.alt} />
                    </div>
                    <div className="card-body">
                        <InnerBlocks.Content />
                    </div> 
                    <a href="#" class="stretched-link"></a>
                </div>
            );
        },
    }
);



registerBlockStyle( 'wordcampprague/cardblock', {
    name: 'dotted',
    label: 'dotted'
} );

registerBlockStyle( 'core/heading', {
    name: 'dotted',
    label: 'dotted'
} );