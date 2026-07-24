import { cn } from "@/lib/utils"
import sanitizeHtml from 'sanitize-html';


interface safeHTMLProps {
    content : string,
    className ?: string
}

const sanitizeConfig = {
    allowedTags : [ 'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3' ],
    allowedAttributes : {
      'a' : ['href', 'target', 'rel']
    }    
}

export default function SafeHTML ({content, className} : safeHTMLProps) {
    const cleanHTML = sanitizeHtml(content || '', sanitizeConfig);
    
    return (
        <div className={cn('prose dark:prose-invert mt-3 leading-relaxed', className)}>
            <div dangerouslySetInnerHTML={{__html : cleanHTML}}></div>
        </div>
    )
}