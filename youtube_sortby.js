
document.cookie="VISITOR_INFO1_LIVE=qDpUsBNO0FY;expire = Thu, 2 Aug 2020 20:47:11 UTC"

function matchQueryParameter(parameter)
{

	var index = 0;
	switch(parameter)
	{
		case 'relevance':
		index = 0;
		break;

		case 'video_date_uploaded':
		index = 1;
		break;

		case 'video_view_count':
		index = 2;
		break;

		case 'video_avg_rating':
		index = 3;
		break;

		default:
		index = 0;
		break;
	}

	return index;
}


function removeQueryParameter(parameter,url)
{

	var returnParameter = new Array();
	var patt = /[&|?]search_sort=([a-z_]*)/ig;
	var page_patt = /[&|?]page=\d*/ig;
	var result = patt.exec(url);
	var sort_by = 'relevance';
	if(result != null)
	{
		sort_by = result[1];
	}
	url = url.replace(patt,'');
	url = url.replace('&&','&'); //in case regex doesn't capture trailing query parameter &
	url = url.replace(page_patt,'');
	url = url.replace('results&','results?');
	returnParameter[0] = url;
	returnParameter[1] = matchQueryParameter(sort_by);
	return returnParameter;
}


$(document).ready(function(){
	var currUrl = window.location.href;
	var selected_class = ['youtube_sortby_notselected', 'youtube_sortby_notselected', 'youtube_sortby_notselected', 'youtube_sortby_notselected'];
	var returnParams = removeQueryParameter('search_sort',currUrl);
	var filter = $('.filter-top');
	var selectedIndex = returnParams[1];
	currUrl = returnParams[0];
	selected_class[selectedIndex] = 'youtube_sortby_selected';
	filter.append("<h3 class = 'youtube_sortby_heading'>Sort By:</h3>");
    filter.append('<div class = "youtube_sortby_holder"></div>');
    var span = $('.youtube_sortby_holder');
	var search_text = ['  Relevance  ','  Date Uploaded  ', '  View Count  ', '  Average Rating  '];
	var search_criteria = ['relevance','video_date_uploaded','video_view_count','video_avg_rating'];

	for(var i = 0; i < search_criteria.length; i++){
		span.append('<a class = "youtube_sortby_button ' + selected_class[i] + '" href = "' + currUrl + '&search_sort=' + search_criteria[i]+ '">' + search_text[i] + '</a>');
	}
});

