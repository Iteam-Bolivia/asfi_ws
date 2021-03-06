<?xml version="1.0" encoding="utf-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	     xsi:schemaLocation="http://research.sun.com/wadl/2006/10 
                    https://wadl.dev.java.net/wadl20061109.xsd"
	     xmlns="http://research.sun.com/wadl/2006/10"
             xmlns:z="urn:zvents:zventsresponse" >
    <grammars>
        <include href="ZventsResponse.xsd"/>
    </grammars>
    <resources base="http://www.zvents.com/rest">
        <resource path="event">
            <method name="GET" id="getEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_new">
            <method name="POST" id="newEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="venue_id" type="xsd:integer" required="true" style="query"/>
                    <param name="starttime" type="xsd:integer" required="true" style="query"/>
                    <param name="endtime" type="xsd:integer" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="false" style="query"/>
                    <param name="price" type="xsd:string" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_update">
            <method name="POST" id="updateEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="venue_id" type="xsd:integer" required="true" style="query"/>
                    <param name="starttime" type="xsd:integer" required="true" style="query"/>
                    <param name="endtime" type="xsd:integer" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="false" style="query"/>
                    <param name="price" type="xsd:string" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_cancel">
            <method name="POST" id="cancelEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="message" type="xsd:string" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_delete">
            <method name="POST" id="deleteEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="message" type="xsd:string" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_tags">
            <method name="GET" id="getEventTags">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_categories">
            <method name="GET" id="getEventCategories">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_groups">
            <method name="GET" id="getEventGroups">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_add_tags">
            <method name="POST" id="addEventTags">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="tag" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_remove_tags">
            <method name="POST" id="removeEventTags">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="tag" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="event_recent">
            <method name="GET" id="getRecentEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="where" type="xsd:string" required="false" style="query"/>
                    <param name="radius" type="xsd:float" required="false" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="search">
            <method name="GET" id="searchEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="what" type="xsd:string" required="false" style="query"/>
                    <param name="where" type="xsd:string" required="false" style="query"/>
                    <param name="when" type="xsd:string" required="false" style="query"/>
                    <param name="radius" type="xsd:float" required="false" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="trim" type="xsd:integer" required="false" style="query"/>
                    <param name="sort" type="xsd:integer" required="false" style="query"/>
                    <param name="cat" type="xsd:integer" required="false" style="query"/>
                    <param name="catex" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="search_for_venues">
            <method name="GET" id="searchVenues">
                <doc xml:lang="en">
                    Search for venues based on the type indicated in the &quot;what&quot; parameter.
                    API documentation :  http://corporate.zvents.com/developers/documentation/search.html
                </doc>
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="what" type="xsd:string" required="false" style="query"/>
                    <param name="where" type="xsd:string" required="false" style="query"/>
                    <param name="radius" type="xsd:float" required="false" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="vt" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="search_within_group">
            <method name="GET" id="searchWithinGroup">
                <doc xml:lang="en">
                    Search for venues based on the type indicated in the &quot;what&quot; parameter.
                    API documentation :  http://corporate.zvents.com/developers/documentation/search.html
                </doc>
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="what" type="xsd:string" required="false" style="query"/>
                    <param name="where" type="xsd:string" required="false" style="query"/>
                    <param name="when" type="xsd:string" required="false" style="query"/>
                    <param name="radius" type="xsd:float" required="false" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="trim" type="xsd:integer" required="false" style="query"/>
                    <param name="sort" type="xsd:integer" required="false" style="query"/>
                    <param name="cat" type="xsd:integer" required="false" style="query"/>
                    <param name="catex" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="categories">
            <method name="GET" id="getCategories">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_types">
            <method name="GET" id="getVenueCategories">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue">
            <method name="GET" id="getVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_new">
            <method name="POST" id="newVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="true" style="query"/>
                    <param name="phone" type="xsd:string" required="false" style="query"/>
                    <param name="address" type="xsd:string" required="false" style="query"/>
                    <param name="city" type="xsd:string" required="false" style="query"/>
                    <param name="state" type="xsd:string" required="false" style="query"/>
                    <param name="country" type="xsd:string" required="false" style="query"/>
                    <param name="zipcode" type="xsd:string" required="false" style="query"/>
                    <param name="timezone" type="xsd:string" required="false" style="query"/>
                    <param name="latitude" type="xsd:float" required="false" style="query"/>
                    <param name="longitude" type="xsd:float" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_update">
            <method name="POST" id="updateVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="false" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="true" style="query"/>
                    <param name="phone" type="xsd:string" required="false" style="query"/>
                    <param name="address" type="xsd:string" required="false" style="query"/>
                    <param name="city" type="xsd:string" required="false" style="query"/>
                    <param name="state" type="xsd:string" required="false" style="query"/>
                    <param name="country" type="xsd:string" required="false" style="query"/>
                    <param name="zipcode" type="xsd:string" required="false" style="query"/>
                    <param name="timezone" type="xsd:string" required="false" style="query"/>
                    <param name="latitude" type="xsd:float" required="false" style="query"/>
                    <param name="longitude" type="xsd:float" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_events">
            <method name="GET" id="getVenueEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="sd" type="xsd:string" required="false" style="query"/>
                    <param name="ed" type="xsd:integer" required="false" style="query"/>
                    <param name="st" type="xsd:string" required="false" style="query"/>
                    <param name="et" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_delete">
            <method name="POST" id="deleteVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="venue_tags">
            <method name="GET" id="getVenueTags">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group">
            <method name="GET" id="getGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_new">
            <method name="POST" id="newGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="true" style="query"/>
                    <param name="private" type="xsd:boolean" required="false" style="query"/>
                    <param name="restrict_event_addition" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_update">
            <method name="POST" id="updateGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="false" style="query"/>
                    <param name="description" type="xsd:string" required="false" style="query"/>
                    <param name="url" type="xsd:string" required="true" style="query"/>
                    <param name="private" type="xsd:boolean" required="false" style="query"/>
                    <param name="restrict_event_addition" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_delete">
            <method name="POST" id="deleteGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_events">
            <method name="GET" id="getGroupEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="sd" type="xsd:string" required="false" style="query"/>
                    <param name="ed" type="xsd:integer" required="false" style="query"/>
                    <param name="st" type="xsd:string" required="false" style="query"/>
                    <param name="et" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_tags">
            <method name="GET" id="getGroupTags">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_add_event">
            <method name="POST" id="addGroupEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="eid" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_remove_event">
            <method name="POST" id="removeGroupEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="eid" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_childgroups">
            <method name="get" id="getChildGroups">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_parent_groups">
            <method name="GET" id="getParentGroups">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_add_parentgroup">
            <method name="POST" id="addParentGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="pgid" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_remove_parentgroup">
            <method name="POST" id="removeParentGroup">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="pgid" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_venues">
            <method name="GET" id="getGroupVenues">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_add_venue">
            <method name="POST" id="addGroupVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="vid" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="group_remove_venue">
            <method name="POST" id="removeGroupVenue">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="vid" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user">
            <method name="GET" id="getUser">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_by_login">
            <method name="GET" id="getUserByLogin">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_events">
            <method name="GET" id="getUserEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="sd" type="xsd:string" required="false" style="query"/>
                    <param name="ed" type="xsd:integer" required="false" style="query"/>
                    <param name="st" type="xsd:string" required="false" style="query"/>
                    <param name="et" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_add_event">
            <method name="POST" id="addUserEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_remove_event">
            <method name="POST" id="removeUserEvent">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_created_events">
            <method name="GET" id="getUserCreatedEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="sd" type="xsd:string" required="false" style="query"/>
                    <param name="ed" type="xsd:integer" required="false" style="query"/>
                    <param name="st" type="xsd:string" required="false" style="query"/>
                    <param name="et" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_created_venues">
            <method name="GET" id="getUserCreatedVenues">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_contacts">
            <method name="GET" id="getUserContacts">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="user_groups">
            <method name="GET" id="getUserGroups">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="tag">
            <method name="GET" id="getTag">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="tag_by_name">
            <method name="GET" id="getTagByName">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="name" type="xsd:string" required="true" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
        <resource path="tag_events">
            <method name="GET" id="getTagEvents">
                <request>
                    <param name="key" type="xsd:string" required="true" style="query"/>
                    <param name="id" type="xsd:integer" required="true" style="query"/>
                    <param name="limit" type="xsd:integer" required="false" style="query"/>
                    <param name="offset" type="xsd:integer" required="false" style="query"/>
                    <param name="sd" type="xsd:string" required="false" style="query"/>
                    <param name="ed" type="xsd:integer" required="false" style="query"/>
                    <param name="st" type="xsd:string" required="false" style="query"/>
                    <param name="et" type="xsd:integer" required="false" style="query"/>
                </request>
                <response>
                    <representation mediaType="text/xml" element="z:rsp"/>
                </response>
            </method>
        </resource>
    </resources>
</application>
